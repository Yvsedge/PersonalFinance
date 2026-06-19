import pool from "./connection.js";


const getAllExpenses = async (req, res) => {
    try{
        const result = await pool.query(
        'SELECT * FROM expenses ORDER BY date desc'
        );
        res.status(200).json({
            expenses: result.rows
        });
    }catch(error){
        throw error;
    }
}

const getExpenses = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const filter =  (req.query.filter) || "";
        const sort =  (req.query.sort) || "asc";
        const search = (req.query.search) || "";
        const limit = 10;
        const offset = (page - 1) * limit;


        let query = `
            SELECT *
            FROM expenses
            WHERE 1=1
        `;

        let countQuery = `
            SELECT COUNT(*)
            FROM expenses
            WHERE 1=1
        `;

        const values = [];
        const countValues = [];

        if (filter !== "All" && filter !== "") {
            values.push(filter);
            countValues.push(filter);
            query += ` AND flow = $${values.length}`;
            countQuery += ` AND flow = $${countValues.length}`;
        }


        if (search !== "") {
            values.push(`%${search}%`);
            countValues.push(`%${search}%`);
            query += ` AND name ILIKE $${values.length}`;
            countQuery += ` AND name ILIKE $${values.length}`;
        }


        if (sort === "Highest") {
            query += ` ORDER BY amount DESC`;
        }
        else if (sort === "Lowest") {
            query += ` ORDER BY amount ASC`;
        }
        else if (sort === "Latest") {
            query += ` ORDER BY date DESC`;
        }
        else if(sort === 'Oldest'){
            query += ` ORDER BY date ASC`;
        }
        else{
            query += ' ORDER BY date DESC';
        }


        values.push(limit);
        query += ` LIMIT $${values.length}`;

        values.push(offset);
        query += ` OFFSET $${values.length}`;

        
        const results = await pool.query(query, values);
        const countResult = await pool.query(countQuery, countValues);
        
        const totalItems = Number(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / limit);

        res.status(200).json({
            page,
            totalPages,
            totalItems,
            expenses: results.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

const getExpenseById = async (req, res) => {
    const id = req.params.id;
    try{
        const result = await pool.query(
        'SELECT * FROM expenses WHERE id = $1',
        [id]
        );
        res.status(200).json(result.rows[0]);
    }catch(error){
        throw error;
    }
};

const createExpense = async (req, res) => {
    const {id, name, amount, category, flow, date} = req.body;
    if(!id || !name || !amount || !flow || !date){
        return res.status(400).send('Invalid Input');
    }
    try{
        const results = await pool.query('INSERT INTO expenses (id, name, amount, category, flow, date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [id, name, amount, category, flow, date]
        );
        res.status(201).json(results.rows[0]);
    }catch(error){
        throw error;
    }
};

const deleteExpense = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query(
            'DELETE FROM expenses WHERE id = $1',
            [id]
        );

        res.status(200).json({
            id
        });
    } catch (error) {
        throw error;
    }
}

const updateExpense = async (req, res) => {
    const id = req.params.id;
    const { name, amount, category, flow, date } = req.body;
    try{
        const result = await pool.query('UPDATE expenses SET name = $1, amount = $2, category = $3, flow = $4, date = $5 WHERE id = $6 RETURNING *',
            [name, amount, category, flow, date, id]
        )
        res.status(200).json(result.rows[0]);
    }catch(error){
        throw error;
    }
};

const getMonthly = async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT
                DATE_TRUNC('month', date) AS month,
                SUM(amount) AS total
            FROM expenses
            WHERE flow = $1
            GROUP BY month
            ORDER BY month`,
            ['Expense']
        );
        res.status(200).json({
            content: result.rows
        });
    }catch(error){
        throw error;
    }
}

const getDaily = async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT
                DATE_TRUNC('day', date) AS date,
                SUM(amount) AS total
            FROM expenses
            WHERE flow = $1
            AND date >= CURRENT_DATE - $2::INTERVAL
            GROUP BY date
            ORDER BY date`,
            ['Expense', '10 days']
        );
        res.status(200).json({
            content: result.rows
        });
    }catch(error){
        throw error;
    }
}

export {
    getAllExpenses,
    getExpenses,
    getExpenseById,
    createExpense,
    deleteExpense,
    updateExpense,
    getMonthly,
    getDaily,
}

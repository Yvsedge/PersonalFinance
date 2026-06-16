import pool from "./connection.js";


const getExpenses = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const filter =  (req.query.filter) || "";
        const sort =  (req.query.sort) || "asc";
        const search = (req.query.search) || "";
        const limit = 10;
        const offset = (page - 1) * limit;

        const countResult = await pool.query(
            'SELECT COUNT(*) FROM expenses'
        );

        const totalItems = Number(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / limit);

        let query = `
            SELECT *
            FROM expenses
            WHERE 1=1
        `;

        const values = [];

        if (filter !== "All" && filter !== "") {
            values.push(filter);
            query += ` AND flow = $${values.length}`;
        }

        console.log(query);
        console.log(values);

        if (search !== "") {
            values.push(`%${search}%`);
            query += ` AND name ILIKE $${values.length}`;
        }

        console.log(query);
        console.log(values);

        if (sort === "Highest") {
            query += ` ORDER BY amount DESC`;
        }
        else if (sort === "Lowest") {
            query += ` ORDER BY amount ASC`;
        }
        else if (sort === "Latest") {
            query += ` ORDER BY date ASC`;
        }
        else if(sort === 'Oldest'){
            query += ` ORDER BY date DESC`;
        }
        else{
            query += '';
        }

        console.log(query);
        console.log(values);

        values.push(limit);
        query += ` LIMIT $${values.length}`;

        values.push(offset);
        query += ` OFFSET $${values.length}`;

        console.log(query);
        console.log(values);
        
        const results = await pool.query(query, values);

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

export {
  getExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
}

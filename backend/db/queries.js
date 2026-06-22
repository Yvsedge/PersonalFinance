import pool from "./connection.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from "google-auth-library";
import 'dotenv/config';

const secretKey = process.env.JWT_SECRET;
const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

const getAllExpenses = async (req, res) => {
    const userId = req.user.userId;
    try{
        const result = await pool.query(
        'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date desc',
        [userId]
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
        const userId = req.user.userId;


        let query = `
            SELECT *
            FROM expenses
            WHERE user_id = $1
        `;

        let countQuery = `
            SELECT COUNT(*)
            FROM expenses
            WHERE user_id = $1
        `;

        const values = [userId];
        const countValues = [userId];

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
            countQuery += ` AND name ILIKE $${countValues.length}`;
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
    const userId = req.user.userId;
    try{
        const result = await pool.query(
        'SELECT * FROM expenses WHERE id = $1 AND user_id = $2',
        [id, userId]
        );
        res.status(200).json(result.rows[0]);
    }catch(error){
        throw error;
    }
};

const createExpense = async (req, res) => {
    const {id, name, amount, category, flow, date} = req.body;
    const userId = req.user.userId;
    if(!id || !name || !amount || !flow || !date){
        return res.status(400).json('Invalid Input');
    }
    try{
        const results = await pool.query('INSERT INTO expenses (id, name, amount, category, flow, date, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [id, name, amount, category, flow, date, userId]
        );
        res.status(201).json(results.rows[0]);
    }catch(error){
        throw error;
    }
};

const deleteExpense = async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    try {
        await pool.query(
            'DELETE FROM expenses WHERE id = $1 and user_id = $2',
            [id, userId]
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
    const userId = req.user.userId;
    const { name, amount, category, flow, date } = req.body;
    try{
        const result = await pool.query('UPDATE expenses SET name = $1, amount = $2, category = $3, flow = $4, date = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
            [name, amount, category, flow, date, id, userId]
        )
        res.status(200).json(result.rows[0]);
    }catch(error){
        throw error;
    }
};

const getMonthly = async (req, res) => {
    const userId = req.user.userId;
    try{
        const result = await pool.query(
            `SELECT
                DATE_TRUNC('month', date) AS month,
                SUM(amount) AS total
            FROM expenses
            WHERE flow = $1
            AND user_id = $2
            GROUP BY month
            ORDER BY month`,
            ['Expense', userId]
        );
        res.status(200).json({
            content: result.rows
        });
    }catch(error){
        throw error;
    }
}

const getDaily = async (req, res) => {
    const userId = req.user.userId;
    try{
        const result = await pool.query(
            `SELECT
                DATE_TRUNC('day', date) AS date,
                SUM(amount) AS total
            FROM expenses
            WHERE flow = $1
            AND user_id = $2
            AND date >= CURRENT_DATE - $3::INTERVAL
            GROUP BY date
            ORDER BY date`,
            ['Expense',userId, '10 days']
        );
        res.status(200).json({
            content: result.rows
        });
    }catch(error){
        throw error;
    }
}

const addUser = async (req, res) => {
    try{
        const {id, first, last, mail, password} = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);

        if(!id || !first || !last || !mail || !password){
            return res.status(400).json("Invalid Input");
        }
        const result = await pool.query('INSERT INTO users (id, firstname, lastname, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [id, first, last, mail, hashedpassword]
        );
        res.status(201).json(result.rows[0]);
    }catch(e){
        throw e;
    }
};

const login = async (req, res) => {
    try {
        const { mail, password } = req.body;

        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [mail]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: 'Invalid email'
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server Error'
        });
    }
};

const getMe = async (req, res) => {
    const userId = req.user.userId;
    try{
        const result = await pool.query(
            `
            SELECT firstname, lastname, email
            FROM users
            WHERE id = $1
            `, [userId]
        );
        res.status(200).json({
            name : result.rows[0]
        })
    }catch(e){
        throw e;
    }
}

const googleLogin = async (req, res) => {
    try{
        const {credential} = req.body;

        const ticket = 
            await client.verifyIdToken({
                idToken: credential,
                audience:
                    process.env.GOOGLE_CLIENT_ID
            });
        
            const payload = ticket.getPayload();

            const email = payload.email;
            const firstname = payload.given_name;
            const lastname = payload.family_name;

            let user = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );


            if (user.rows.length === 0) {
                user = await pool.query(
                    `
                    INSERT INTO users
                    (id, firstname, lastname, email)
                    VALUES ($1,$2,$3,$4)
                    RETURNING *
                    `,
                    [
                        crypto.randomUUID(),
                        firstname,
                        lastname,
                        email
                    ]
                );
            }

            const dbUser = user.rows[0];

            const token = jwt.sign(
                {
                    userId: dbUser.id,
                    email: dbUser.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            res.json({
                token
            });

    }catch(e){
        res.status(401).json({
            message: "Google login failed"
        });
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
    addUser,
    login,
    getMe,
    googleLogin,
}

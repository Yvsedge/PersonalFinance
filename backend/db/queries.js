import pool from "./connection.js";


const getExpenses = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM expenses ORDER BY date ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    throw error;
  }
}

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

const express = require('express');
const router = express.Router();

const expenses = require('../data/expense');

router.get('/', (req, res) => {
    if(expenses.length == 0){
        return res.json([]);
    }
    res.json(expenses);
})

router.get('/:id', (req, res) => {
    const expense = expenses.find(
        expense => expense.id == req.params.id
    );

    if(!expense){
        return res.status(404).send('Expense Not Found');
    }

    res.json(expense);
})

router.post('/', (req, res) => {
    const {id, name, amount, category, flow, date} = req.body;
    if(!id || !name || !amount || !flow || !date){
        return res.status(400).send('Invalid Input');
    }
    expenses.push({id, name, amount, category, flow, date});

    res.status(201).json({id, name, amount, category, flow, date});
});


router.delete('/:id', (req, res) => {
    const idx = expenses.findIndex(exp => exp.id === req.params.id);

    if(idx === -1){
        return res.status(404).send('Not Found!');
    }

    const deletedExpense = expenses[idx];

    expenses.splice(idx, 1);

    res.json({
        expense : deletedExpense.id  
    });
})

router.put("/:id", (req, res) => {
    const id = req.params.id;

    const { name, amount, category, flow, date } = req.body;

    const expense = expenses.find(exp => exp.id === id);

    if (!expense) {
        return res.status(404).send("Expense not found");
    }

    expense.name = name;
    expense.amount = amount;
    expense.category = category;
    expense.flow = flow;
    expense.date = date;

    res.status(200).json(expense);
});


module.exports = router;

const express = require('express');
const app = express();
const cors = require('cors');
const expenseRoute = require('./routes/expense')
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/expenses', expenseRoute);

app.listen(port, () => {
    console.log(`Server hosted at localhost:${port}`);
})

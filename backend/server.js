import express from "express";
import cors from "cors";
import expenseRouter from "./routes/expense.js";

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/expenses', expenseRouter);

app.listen(port, () => {
    console.log(`Server hosted at localhost:${port}`);
})



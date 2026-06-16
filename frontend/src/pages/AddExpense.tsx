import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm'
import ExpensesList from '../components/ExpensesList'
import type {Expense} from '../types/Expenses'



export default function AddExpense() {
    const [editing, setEditing] = useState<Expense | null>(null);
    return (
        <div className="addExpenseContainer">
            <ExpensesList onEdit={setEditing}></ExpensesList>
            <ExpenseForm editing={editing} onClear={() => setEditing(null)}></ExpenseForm>
        </div>
    );
}

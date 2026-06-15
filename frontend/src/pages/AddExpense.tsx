import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm'
import ExpensesList from '../components/ExpensesList'
import type {Expense} from '../types/Expenses'

type Props = {
};

export default function AddExpense({}: Props) {
    const [editing, setEditing] = useState<Expense | null>(null);
    return (
        <div className="addExpenseContainer">
            <ExpensesList onEdit={setEditing}></ExpensesList>
            <ExpenseForm editing={editing} onClear={() => setEditing(null)}></ExpenseForm>
        </div>
    );
}

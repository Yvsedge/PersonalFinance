import { useState } from 'react';
import type{Expense} from '../types/Expenses'


type Props = {
    exp : Expense,
    handleDelete : (id : string) => void;
    onEdit: (exp: Expense) => void;
};

export default function ExpenseCard({exp, handleDelete, onEdit}: Props) {
    const formattedAmount = new Intl.NumberFormat("en-IN").format(
        Math.abs(exp.amount)
    );
    const gclass = () => {
        if(exp.flow == 'Income'){
            return "incomeFlow"
        }
        return "expenseFlow"
    };

    const date = new Date(exp.date).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata"
    })

    return (
        <div className={`ExpenseCard ${gclass()}`}>
            <div className="ExpenseCardBtns">
                <button onClick={() => {onEdit(exp)}} className="editBtn">Edit</button>
                <button className="deleteBtn" onClick={() => handleDelete(exp.id)}>
                    ✕
                </button>
            </div>
            <div className="ExpenseCardMain">
                <div className="FlowStats">
                    <span className="FlowTitle">{exp.name}</span>
                    <p>{exp.flow} . {exp.category}</p>
                </div>
                <div className="NumericalStats">
                    <span 
                        className="FlowTitle"
                        style={{color : exp.flow == "Income" ? "var(--success)" : "var(--expense)"}}
                    >{`₹${formattedAmount}`}</span>
                    <p>{date}</p>
                </div>
            </div>
        </div>
    );
}

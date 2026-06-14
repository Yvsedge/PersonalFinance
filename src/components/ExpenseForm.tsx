import type{ Expense } from '../types/Expenses'
import {useExp} from '../hooks/useExp'
import React, { useState , useEffect} from 'react';

type Props = {
    editing: Expense | null;
    onClear: () => void;
}

export default function ExpenseForm({editing, onClear} : Props) {
    const [text, setText] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [flow, setFlow] = useState<string>("")
    const [cat, setCat] = useState<"Food" | "Travel" | "Shopping" | "Bills" | "--">("Bills");
    
    const {dispatch} = useExp();
    const handleSubmit = async () => {

        if(text.trim() === "") return;
        if(amount <= 0) return;

        const obj: Expense = {
            id: crypto.randomUUID(),
            name : text,
            amount : amount,
            category: flow === "Income" ? "--" : cat,
            flow : flow === "Income" ? 'Income' : 'Expense',
            date : new Date().toISOString()
        };

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/expenses`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }
        );

        const newExp = await response.json();
        dispatch({
            type: "ADD_EXP",
            expense: newExp
        });

        setText("");
        setAmount(0);
        setFlow("");
    };

    const handleEdit = async () => {
        if(editing === null) return;
        if(text.trim() === "") return;
        if(amount <= 0) return;

        const obj: Expense = {
            id: editing.id,
            name : text,
            amount : amount,
            category: flow === "Income" ? "--" : cat,
            flow : flow === "Income" ? 'Income' : 'Expense',
            date : new Date().toISOString()
        };

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/expenses/${editing.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }
        );

        const newExp = await response.json();
        dispatch({
            type : "UPDATE_EXP",
            expense : newExp,
        });

        setText("");
        setAmount(0);
        setFlow("");
        onClear();
    };

    const handleFormSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        if(editing){
            handleEdit();
        }
        else{
            handleSubmit();
        }
    };

    const handleClear = () => {
        setText("");
        setAmount(0);
        setFlow("");
        onClear();
    };

    useEffect(() => {
        if(editing){
            setText(editing.name);
            setAmount(editing.amount);
            setFlow(editing.flow);
            setCat(editing.category);
        }
    }, [editing]);
    return (
        <div className="expenseFormContainer">
            <p className="formTitle">
                {editing ? "Edit Transaction" : "Add Transaction"}
            </p>
            <form onSubmit={e => handleFormSubmit(e)}>
                <label htmlFor="title">Title
                    <input type="text" 
                        name="title" 
                        id="title" 
                        value={text} 
                        placeholder="Pizza"
                        onChange={e => setText(e.currentTarget.value)}
                    />
                </label>
                <label htmlFor="amount">Amount
                    <input 
                        type="number" 
                        name="amount" 
                        id="amount" 
                        value={amount} onChange={e => setAmount(Number(e.currentTarget.value))}
                        placeholder="300"
                    />
                </label>

                <label htmlFor="flow">Flow
                    <select
                        value={flow}
                        name="flow"
                        onChange={e => setFlow(e.currentTarget.value === "Income" ? 'Income' : 'Expense')}
                    >
                        <option value="" disabled>
                            Select Type
                        </option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </label>

                {flow === "Expense" && (
                    <label htmlFor="Cat">Categories
                        <select
                            value={cat}
                            name="Cat"
                            onChange={e => setCat(e.currentTarget.value as "Food" | "Travel" | "Shopping" | "Bills")}
                        >
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                        </select>
                    </label>
                )}
                <button type="submit">{editing ? "Update Transaction" : "Add Transaction"}</button>
                {editing && (
                    <button onClick={() => handleClear()} className="cancelBtn">
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

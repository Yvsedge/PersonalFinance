import type{ Expense } from '../types/Expenses'
import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useMutation , useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

type Props = {
    editing: Expense | null;
    onClear: () => void;
}

const insertionNotification = () => {
    toast.success("Inserted Successfully!", {
        style: {
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--success)",
            color: "var(--background)"
        }
    })
}

const editNotification = () => {
    toast.success("Edited Successfully!", {
        style: {
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--success)",
            color: "var(--background)"
        }
    })
}

export default function ExpenseForm({editing, onClear} : Props) {
    useEffect(() => {
        if(editing){
            setText(editing.name);
            setAmount(editing.amount);
            setFlow(editing.flow);
            setCat(editing.category);
        }
    }, [editing]);
    
    const navigate = useNavigate();
    const [text, setText] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [flow, setFlow] = useState<string>("")
    const [cat, setCat] = useState<"Food" | "Travel" | "Shopping" | "Bills" | "--">("Bills");

    const queryClient = useQueryClient();

    const createExpenseMutation = useMutation({
        mutationFn: async (expense: Expense) => {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/expenses`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                    body: JSON.stringify(expense)
                }
            );

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }

            return response.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["dashboardExpenses"]
            });

            queryClient.invalidateQueries({
                queryKey: ["expenses"]
            });

            queryClient.invalidateQueries({
                queryKey: ["dailyExpenditure"]
            });

            queryClient.invalidateQueries({
                queryKey: ["monthlyExpense"]
            });

            insertionNotification();
        },
        onError: () => {
            toast.error("Failed to create transaction", {
            style: {
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                background: "var(--surface)",
                backgroundColor: "var(--expense)",
                color: "var(--background)"
            }
            });
        }
    });

    const updateExpenseMutation = useMutation({
        mutationFn: async (expense: Expense) => {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/expenses/${expense.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    },
                    body: JSON.stringify(expense)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update expense");
            }

            return response.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["dashboardExpenses"]
            });

            queryClient.invalidateQueries({
                queryKey: ["expenses"]
            });

            queryClient.invalidateQueries({
                queryKey: ["dailyExpenditure"]
            });

            queryClient.invalidateQueries({
                queryKey: ["monthlyExpense"]
            });

            editNotification();
        },
        onError: () => {
            toast.error("Failed to Update transaction", {
            style: {
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--expense)",
                color: "var(--background)"
            }
            });
        },

    });

    const handleSubmit = async () => {

        if(!text || amount == 0 || flow == ""){
            toast.error("Invalid Input",{
                style: {
                    background : "var(--surface)",
                    border : "1px solid var(--border)",
                    backgroundColor: "var(--expense)",
                    color: "var(--background)"
                }
            });
            return;
        }

        const obj: Expense = {
            id: crypto.randomUUID(),
            name : text,
            amount : amount,
            category: flow === "Income" ? "--" : cat,
            flow : flow === "Income" ? 'Income' : 'Expense',
            date : new Date().toISOString()
        };

        await createExpenseMutation.mutateAsync(obj);       

        navigate("/transactions?page=1");
        setText("");
        setAmount(0);
        setFlow("");
    };

    const handleEdit = async () => {
        if(editing === null) return;
        if(!text || amount == 0 || flow == ""){
            toast.error("Invalid Input",{
                style: {
                    background : "var(--surface)",
                    border : "1px solid var(--border)",
                    backgroundColor: "var(--expense)",
                    color: "var(--background)"
                }
            });
            return;
        }

        const obj: Expense = {
            id: editing.id,
            name : text,
            amount : amount,
            category: flow === "Income" ? "--" : cat,
            flow : flow === "Income" ? 'Income' : 'Expense',
            date : new Date().toISOString()
        };

        await updateExpenseMutation.mutateAsync(obj);   

        navigate("/transactions?page=1");
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
                <button
                    type="submit"     
                    disabled={
                    createExpenseMutation.isPending ||
                    updateExpenseMutation.isPending
                }
                >{editing ? "Update Transaction" : "Add Transaction"}</button>
                {editing && (
                    <button onClick={() => handleClear()} className="cancelBtn">
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
}

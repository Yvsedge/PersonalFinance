import {useExp} from '../hooks/useExp'
import ExpenseCard from './ExpenseCard'
import type{Expense} from '../types/Expenses'
import { useState } from 'react';

type Props = {
    onEdit: (exp: Expense) => void;
}

export default function ExpensesList({onEdit} : Props) {
    const {expenses, dispatch} = useExp();
    const [sort, setSort] = useState<"Latest" | "Oldest" | "Highest" | "Lowest" | "">("");
    const [filter,setFilter] = useState<"All" | "Income" | "Expense">("All");
    const [search, setSearch] = useState("");
    const handleDelete = async (id : string) => {

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/expenses/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );

        if (!response.ok) {
            console.error("Delete failed");
            return;
        }

        dispatch({
            type : "REMOVE_EXP",
            expID : id,
        });

    };    
    
    const filteredExpenses = expenses.filter(
        exp => filter === "All" || exp.flow === filter
    );
    const properExpenses = filteredExpenses.filter(
        exp => exp.name?.toLowerCase().includes(search.toLowerCase())
    );
    const sorted = () => {
        if (sort === "") return properExpenses;
        
        const copy = [...properExpenses];
        
        if (sort === "Highest") return copy.sort((a, b) => b.amount - a.amount);
        if (sort === "Lowest")  return copy.sort((a, b) => a.amount - b.amount);
        if (sort === "Latest")  return copy.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        if (sort === "Oldest")  return copy.sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        return copy;
    };
    return (
        <div>
            <div className="transactionListHeader">
                <span className="FlowTitle">Transactions</span>
                <input 
                    type="text" 
                    name="searchBar" 
                    id="searchBar" 
                    onChange={e => setSearch(e.currentTarget.value)}
                    placeholder="Type to Search..."    
                />
                <div className="btns">
                    <button 
                        className={filter === "All" ? "filterBtn active" : "filterBtn"}
                        onClick={() => setFilter("All")}
                    >
                        All
                    </button>
                    <button 
                        className={filter === "Income" ? "filterBtn active" : "filterBtn"}
                        onClick={() => setFilter("Income")}
                    >
                            Income
                    </button>
                    <button 
                        className={filter === "Expense" ? "filterBtn active" : "filterBtn"}
                        onClick={() => setFilter("Expense")}
                    >
                        Expense
                    </button>
                    <select
                        value={sort}
                        name="Cat"
                        onChange={e => setSort(e.currentTarget.value as "Latest" | "Oldest" | "Highest" | "Lowest" | "")}
                    >
                        <option value="">Sort</option>
                        <option value="Latest">Latest</option>
                        <option value="Oldest">Oldest</option>
                        <option value="Highest">Highest</option>
                        <option value="Lowest">Lowest</option>
                    </select>
                </div>
            </div>
            <div className="transactionList">
                {
                expenses.length === 0 
                    ? <p>No transactions yet — add one</p>
                    : sorted().length === 0
                    ? <p>No transactions match your search</p>
                    : sorted().map(exp =><ExpenseCard 
                                                    key={exp.id} 
                                                    exp={exp}
                                                    handleDelete={handleDelete}
                                                    onEdit={onEdit}
                                                />
                                        )
                }
            </div>
        </div>
    );
}



import {useExp} from '../hooks/useExp'
import ExpenseCard from './ExpenseCard'
import type{Expense} from '../types/Expenses'
import {useSearchParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
type Props = {
    onEdit: (exp: Expense) => void;
}

export default function ExpensesList({onEdit} : Props) {
    const {expenses, dispatch, totalPage} = useExp();
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const filter = searchParams.get("filter") || "All";
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";
    const [searchInput, setSearchInput] = useState(search);
    
    const handleFilterChange = (
        value: "" | "Income" | "Expense"
    ) => {
        setSearchParams({ 
            page: "1",
            filter : value,
            sort,
            search,
        });
    };

    const handleSortChange = (
        value : "Latest" | "Oldest" | "Highest" | "Lowest" | ""
    ) => {
        setSearchParams({
            page : "1",
            filter,
            sort : value,
            search,
        })
    };

    useEffect(() => {
        if (searchInput === search) return;

        const timeout = setTimeout(() => {
            setSearchParams({
                page: "1",
                filter,
                sort,
                search: searchInput
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchInput, search, filter, sort, setSearchParams]);

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
    
    return (
        <div>
            <div className="transactionListHeader">
                <span className="FlowTitle">Transactions</span>
                <input 
                    type="text" 
                    name="searchBar" 
                    id="searchBar" 
                    value={searchInput}
                    onChange={e => setSearchInput(e.currentTarget.value)}
                    placeholder="Type to Search..."    
                />
                <div className="btns">
                    <button 
                        className={filter === "" ? "filterBtn active" : "filterBtn"}
                        onClick={() => handleFilterChange("")}
                    >
                        All
                    </button>
                    <button 
                        className={filter === "Income" ? "filterBtn active" : "filterBtn"}
                        onClick={() => handleFilterChange("Income")}
                    >
                            Income
                    </button>
                    <button 
                        className={filter === "Expense" ? "filterBtn active" : "filterBtn"}
                        onClick={() => handleFilterChange("Expense")}
                    >
                        Expense
                    </button>
                    <select
                        value={sort}
                        name="Cat"
                        onChange={e => handleSortChange(e.currentTarget.value as "Latest" | "Oldest" | "Highest" | "Lowest" | "")}
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
                    : expenses.length === 0 && search !== ""
                    ? <p>No transactions match your search</p>
                    : expenses.map(exp =>
                                        <ExpenseCard 
                                                    key={exp.id} 
                                                    exp={exp}
                                                    handleDelete={handleDelete}
                                                    onEdit={onEdit}
                                                />
                                        )
                }
                <div className="transactionListbuttons">
                    <button
                        onClick={() =>
                                setSearchParams({
                                    page: String(page - 1),
                                    filter,
                                    sort,
                                    search
                                })
                        }
                        disabled={page === 1}
                        className={page === 1 ? "pageBtn disabled" : "pageBtn"}
                    >
                        Prev
                    </button>
                    <span className="pageIndicator">
                        Page {page} of {totalPage}
                    </span>
                    <button
                        onClick={() =>
                            setSearchParams({
                                page: String(page + 1),
                                filter,
                                sort,
                                search
                            })
                        }
                        disabled={page >= totalPage}
                        className={page >= totalPage ? "pageBtn disabled" : "pageBtn"}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}



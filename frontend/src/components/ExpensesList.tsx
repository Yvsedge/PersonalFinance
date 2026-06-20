import ExpenseCard from './ExpenseCard'
import type{Expense} from '../types/Expenses'
import {useSearchParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useQuery, useMutation , useQueryClient } from '@tanstack/react-query';

import Spinner from './Spinner';
import ErrorState from './ErrorState';
type Props = {
    onEdit: (exp: Expense) => void;
}


type ExpensesResponse = {
    expenses: Expense[];
    totalPages: number;
    totalItems: number;
    page: number;
};

export default function ExpensesList({onEdit} : Props) {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const filter = searchParams.get("filter") || "";
    const sort = searchParams.get("sort") || "";
    const search = searchParams.get("search") || "";
    const [searchInput, setSearchInput] = useState(search);

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
    

    const queryClient = useQueryClient();

    const fetchExpenses = async (
        page: number,
        filter: string,
        sort: string,
        search: string
    ): Promise<ExpensesResponse> => {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/expenses?page=${page}&filter=${filter}&sort=${sort}&search=${search}`,
            {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    };

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/expenses/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error();
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
        }
    });

    const { data, isLoading, error} = 
    useQuery({
        queryKey: [
            "expenses",
            page,
            filter,
            sort,
            search
        ],
        queryFn: () =>
            fetchExpenses(
                page,
                filter,
                sort,
                search
            )
    });

    const expenses = data?.expenses ?? [];
    const totalPage = data?.totalPages ?? 1;
    
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

      if (isLoading) {
        return <Spinner></Spinner>;
    }

    if (error) {
        return <ErrorState></ErrorState>;
    }



    const handleDelete = (id: string) => {
        deleteMutation.mutate(id);
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
                    expenses.length === 0 && search !== ""
                        ? <p>No transactions match your search</p>
                    : expenses.length === 0
                        ? <p>No transactions yet — add one</p>
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



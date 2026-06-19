import type{Expense} from '../types/Expenses'
import {Link} from 'react-router-dom'
import CategoryCard from './CategoryCard'
import RecentTransaction from './RecentTransaction'
import SummaryCard from './SummaryCards'
import { useQuery } from '@tanstack/react-query';
import Spinner from './Spinner'
import PieChartComponent from './PieChartComponent'
import ErrorState from './ErrorState'
import { useEffect, useState } from 'react';
import LineChartComponent from './LineChartComponent'

type DashboardResponse = {
    expenses: Expense[];
};

type DExpenditure = {
    content : {date : Date, total : number}[],
}

type MExpenditure = {
    content : {month : Date, total : number}[],
}

const fetchDashboardExpenses = async (): Promise<DashboardResponse> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/dashboard`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch");
    }

    return res.json();
};

const fetchDailyExpenses = async () : Promise<DExpenditure> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/analytics/daily`
    );

    if(!res.ok){
        throw new Error('Fetch to fetch');
    }

    return res.json();
}

const fetchMonthlyExpenses = async () : Promise<MExpenditure> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/analytics/monthly`
    );

    if(!res.ok){
        throw new Error('Fetch to fetch');
    }

    return res.json();
}

export default function DashboardStats() {

    const [, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
    );

    const [toggle, setToggle] = useState<'daily' | 'monthly'>('daily');

    useEffect(() => {
    const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
    }, []);

    const {
        data: dashboardData,
        isLoading: dashboardLoading,
        error: dashboardError
    } = useQuery<DashboardResponse>({
        queryKey: ["dashboardExpenses"],
        queryFn: fetchDashboardExpenses,
    });

    const {
        data: dailyData,
        isLoading: dailyLoading,
        error: dailyError
    } = useQuery<DExpenditure>({
        queryKey: ["dailyExpenditure"],
        queryFn: fetchDailyExpenses,
    });

    const {
        data: monthlyData,
        isLoading: monthlyLoading,
        error: monthlyError
    } = useQuery<MExpenditure>({
        queryKey: ["monthlyExpense"],
        queryFn: fetchMonthlyExpenses,
    });

    if (dashboardLoading) {
        return <Spinner></Spinner>;
    }

    if (dashboardError) {
        return <ErrorState></ErrorState>;
    }

    const expenses = dashboardData?.expenses ?? [];

    const chartData =
    toggle === "daily"
        ? dailyData?.content.map(item => ({
            date: new Date(item.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            }),
            total: Number(item.total),
        }))
        : monthlyData?.content.map(item => ({
            date: new Date(item.month).toLocaleDateString("en-IN", {
                month: "short",
                year: "2-digit",
            }),
            total: Number(item.total),
        }));

    const totalIncome  = expenses
        .filter(exp => exp.flow === 'Income')
        .reduce((acc, exp) => acc + Number(exp.amount), 0);
    
    const incomeTransactions = expenses.filter(exp => exp.flow == "Income").length;
    const expenseTranscations = expenses.filter(exp => exp.flow == "Expense").length;

    const totalExpense = expenses
        .filter(exp => exp.flow === 'Expense')
        .reduce((acc, exp) => acc + Number(exp.amount), 0);

    const Balance = totalIncome - totalExpense;
    const categories = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(categories)
    .filter(([category]) => category !== "--")
    .map(([category, amount]) => ({
        name: category,
        value: amount
    }));

    const palette = ["var(--cat-travel)", "var(--cat-food)", "var(--cat-shopping)" , "var(--cat-bills)"]

    const colorMap: Record<string, string> = {
        Food:     "var(--cat-food)",
        Travel:   "var(--cat-travel)",
        Bills:    "var(--cat-bills)",
        Shopping: "var(--cat-shopping)",
    };

    return (
        <div className="dashboardStats">
            <div className="dashboardMain">
                <SummaryCard title={"Balance"} amount={Balance} expTrans={expenseTranscations} incTrans={incomeTransactions}></SummaryCard>
                <SummaryCard title={"Income"} amount={totalIncome} expTrans={0} incTrans={incomeTransactions}></SummaryCard>
                <SummaryCard title={"Expense"} amount={totalExpense} expTrans={expenseTranscations} incTrans={0}></SummaryCard>
            </div>
            <div className="dashboardSub">
                <div className="dashboardAreaG">
                    {
                    toggle === 'daily' ?
                        dailyLoading 
                        ? <Spinner></Spinner> 
                        : dailyError 
                        ? <ErrorState></ErrorState>
                        :
                        <div>
                            <p><span className="subheading dashboardSubHeading">Expenses By {toggle === 'daily' ? "Day" : "Month"}</span></p>
                            <LineChartComponent data={chartData ?? []}></LineChartComponent>
                            <div className="dashboardButtons">
                                <button onClick={() => setToggle('daily')}>Daily</button>
                                <button onClick={() => setToggle('monthly')}>Monthly</button>
                            </div>
                        </div>
                    : monthlyLoading 
                    ? <Spinner/>
                    :
                    monthlyError
                    ? <ErrorState></ErrorState>
                    :
                    <div>
                        <p><span className="subheading dashboardSubHeading">Expenses By {"Month"}</span></p>
                        <LineChartComponent data={chartData ?? []}></LineChartComponent>
                        <div className="dashboardButtons">
                            <button onClick={() => setToggle('daily')}>Daily</button>
                            <button onClick={() => setToggle('monthly')}>Monthly</button>
                        </div>
                    </div>
                    }
                </div>
                <p><span className="subheading dashboardSubHeading">Expenses By Category</span></p>
                    <div className="dashboardPieC" >
                        <PieChartComponent palette={palette} pieData={pieData} totalExpense={totalExpense} />
                        <div className="dashboardCat">
                            {Object.entries(categories).map(([category, amount]) => {
                            return category !== "--" && (
                                <CategoryCard
                                key={category}
                                category={category}
                                amount={amount}
                                percentage={(amount / totalExpense) * 100}
                                color={colorMap[category] ?? "#888"}
                                />
                            );
                            })}
                        </div>
                    </div>
                <div className="dashboardRecent">
                        <div className="sectionHeader">
                            <span className="subheading dashboardSubHeading">Recent Transactions</span>
                            <Link to="/transactions">
                                View All →
                            </Link>
                        </div>
                    <RecentTransaction transactions={expenses.slice(0, 10)}></RecentTransaction>
                </div>
            </div>
        </div>
    );
}

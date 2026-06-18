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

type DashboardResponse = {
    expenses: Expense[];
};

const fetchDashboardExpenses = async (): Promise<DashboardResponse> => {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/expenses/dashboard`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch");
    }

    return res.json();
};

export default function DashboardStats() {

    const [isDark, setIsDark] = useState(
    document.documentElement.getAttribute('data-theme') === 'dark'
    );

    useEffect(() => {
    const observer = new MutationObserver(() => {
        setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
    }, []);
    
    const { data, isLoading, error } = useQuery<DashboardResponse>({
        queryKey: ["dashboardExpenses"],
        queryFn: fetchDashboardExpenses,
    });

    if (isLoading) {
        return <Spinner></Spinner>;
    }

    if (error) {
        return <ErrorState></ErrorState>;
    }

    const expenses = data?.expenses ?? [];

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

    const lightPalette = ["#7E2E84", "#10B981", "#F59E0B", "#EF4444"];
    const darkPalette  = ["#CB7BD1", "#34D399", "#FBBF24", "#F87171"];

    const palette = isDark ? darkPalette : lightPalette;

    const colorMap: Record<string, string> = {
        Food:     palette[0],
        Travel:   palette[1],
        Bills:    palette[2],
        Shopping: palette[3],
    };

    return (
        <div className="dashboardStats">
            <div className="dashboardMain">
                <SummaryCard title={"Balance"} amount={Balance} expTrans={expenseTranscations} incTrans={incomeTransactions}></SummaryCard>
                <SummaryCard title={"Income"} amount={totalIncome} expTrans={0} incTrans={incomeTransactions}></SummaryCard>
                <SummaryCard title={"Expense"} amount={totalExpense} expTrans={expenseTranscations} incTrans={0}></SummaryCard>
            </div>
            <div className="dashboardSub">
                <p><span className="subheading dashboardSubHeading">Expenses By Category</span></p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)", alignItems: "center" }}>
                    <PieChartComponent palette={palette} pieData={pieData} totalExpense={totalExpense} isDark={isDark} />
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
                    <RecentTransaction transactions={expenses}></RecentTransaction>
                </div>
            </div>
        </div>
    );
}

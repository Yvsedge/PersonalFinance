import type{Expense} from '../types/Expenses'
import {Link} from 'react-router-dom'
import CategoryCard from './CategoryCard'
import RecentTransaction from './RecentTransaction'
import SummaryCard from './SummaryCards'
import { Pie, PieChart, Tooltip , Cell, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import Spinner from './Spinner'
import ErrorState from './ErrorState'

type DashboardResponse = {
    expenses: Expense[];
};


export default function DashboardStats() {
    
    const fetchDashboardExpenses = async (): Promise<DashboardResponse> => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/expenses/dashboard`
        );

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    };

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

    const COLORS = [
    "#7E2E84",
    "#10B981",
    "#F59E0B",
    "#EF4444"
    ];

    function PieChartDefaultIndex() {
    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <PieChart width={400} height={400}>
                <Pie 
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={90}
                    outerRadius={140}
                    label={({ cx, cy }) => (
                        <text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        >
                        <tspan
                            x={cx}
                            dy="-10"
                            fontSize="28"
                            fontWeight="bold"
                        >
                            ₹{totalExpense.toLocaleString()}
                        </tspan>

                        <tspan
                            x={cx}
                            dy="25"
                            fontSize="14"
                            fill="#666"
                        >
                            Expenses
                        </tspan>
                        </text>
                    )}
                >
                {pieData.map((entry, index) => (
                    <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                    />
                ))}
                </Pie>
                <Tooltip defaultIndex={2} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );

    }
    
    return (
        <div className="dashboardStats">
            <div className="dashboardMain">
                <SummaryCard title={"Balance"} amount={Balance} expTrans={expenseTranscations} incTrans={incomeTransactions}></SummaryCard>
                <SummaryCard title={"Income"} amount={totalIncome} expTrans={0} incTrans={incomeTransactions}></SummaryCard>
                <SummaryCard title={"Expense"} amount={totalExpense} expTrans={expenseTranscations} incTrans={0}></SummaryCard>
            </div>
            <div className="dashboardSub">
                <p><span className="subheading dashboardSubHeading">Expenses By Category</span></p>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                    <PieChartDefaultIndex/>
                    <div className="dashboardCat">        
                        {
                            Object.entries(categories).map(([category, amount]) => (
                                category != "--" && <CategoryCard  key={category} category={category} amount={amount} percentage={(amount / totalExpense) * 100}></CategoryCard>
                            ))
                        }
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

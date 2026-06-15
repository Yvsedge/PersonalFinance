import {useExp} from '../hooks/useExp'
import {Link} from 'react-router-dom'
import CategoryCard from './CategoryCard'
import RecentTransaction from './RecentTransaction'
import SummaryCard from './SummaryCards'
export default function DashboardStats() {
    const {expenses} = useExp();

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
    return (
        <div className="dashboardStats">
            <div className="dashboardMain">
                <SummaryCard title={"Balance"} amount={Balance} expTrans={expenseTranscations} incTrans={incomeTransactions}></SummaryCard>
                <SummaryCard title={"Income"} amount={totalIncome} expTrans={0} incTrans={incomeTransactions}></SummaryCard>
                <SummaryCard title={"Expense"} amount={totalExpense} expTrans={expenseTranscations} incTrans={0}></SummaryCard>
            </div>
            <div className="dashboardSub">
                <p><span className="subheading dashboardSubHeading">Expenses By Category</span></p>
                <div className="dashboardCat">        
                    {
                        Object.entries(categories).map(([category, amount]) => (
                            category != "--" && <CategoryCard  key={category} category={category} amount={amount} percentage={(amount / totalExpense) * 100}></CategoryCard>
                        ))
                    }
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

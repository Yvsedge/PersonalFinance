import type {Expense} from '../types/Expenses'

type Props = { transactions: Expense[] }

export default function RecentTransactions({ transactions }: Props) {
    if (transactions.length === 0) {
        return <p>No transactions yet</p>  // empty state
    }

    const getDates = (eDate : string) => {
        return new Date(eDate).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata"
})
    }
    

    return (
        <div className="recentList">
            {transactions.map(exp => (
                <div key={exp.id} className={`recentRow ${exp.flow === 'Income' ? 'incomeFlow' : 'expenseFlow'}`}>
                    <div className="recentLeft">
                        <span>{exp.name}</span>
                    </div>
                    <div className="recentMid">
                        <span>{exp.category} · {getDates(exp.date)}</span>
                    </div>
                    <div className={exp.flow === 'Income' ? 'gain' : 'loss'}>
                        {exp.flow === 'Income' ? '+' : '-'}₹{exp.amount.toLocaleString('en-IN')}
                    </div>
                </div>
            ))}
        </div>
    );
}

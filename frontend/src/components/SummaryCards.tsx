type Props = {
    title : string,
    amount : number,
    expTrans : number,
    incTrans : number,
};

import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

export default function SummaryCards({title, amount, expTrans, incTrans}: Props) {
    const icon = title === 'Income' 
    ? <FaArrowTrendUp /> 
    : title === 'Expense' 
    ? <FaArrowTrendDown /> 
    : null;
    const gclass = () => {
        switch(title){
            case 'Balance':
                return amount < 0 ? "balanceCard loss" : "balanceCard gain";
            case 'Income':
                return "incomeCard gain";
            case 'Expense':
                return "expenseCard loss";
            default:
                return " ";
        }
    }

    const formattedAmount = new Intl.NumberFormat("en-IN").format(
        Math.abs(amount)
    );
    return (
        <div className={`CardContainer ${gclass()}`}>
            <div className="CardAmount">

                    {amount < 0
                        ? `-₹${formattedAmount}`
                        : `₹${formattedAmount}`
                    }
            </div>
            <div className="CardTitle">
                {icon}  {title}
            </div>
            <div className="CardTitle">
                <span className="subtext">Transactions: {expTrans == 0 ? incTrans : incTrans == 0 ? expTrans : expTrans + incTrans}</span>
            </div>
        </div>
    );
}

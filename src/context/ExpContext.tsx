
import { createContext } from "react";
import type {Expense} from '../types/Expenses'
import type {ExpenseAction} from '../types/ExpenseAction'

type ExpContextType = {
    expenses: Expense[];
    dispatch: React.Dispatch<ExpenseAction>;
    loading : boolean;
    error : boolean;
};

export const ExpContext = createContext<ExpContextType>({
    expenses: [],
    dispatch: () => {},
    loading: true,
    error : false,
});

import type {Expense} from '../types/Expenses'
import type {ExpenseAction} from '../types/ExpenseAction'

export const expReducer = (expenses : Expense[], action : ExpenseAction) : Expense[] => {
  switch(action.type){
    case 'ADD_EXP':
        if(action.expense === undefined) return expenses;
        return[
            ...expenses,
            action.expense
        ]
    case 'REMOVE_EXP':
        return expenses.filter(exp => exp.id !== action.expID);
    case 'LOAD_EXP':
        return action.expenses;
    case "UPDATE_EXP":
    if (action.expense === undefined) return expenses;

    return expenses.map(exp =>
        exp.id === action.expense.id
            ? action.expense
            : exp
    );
  }
};

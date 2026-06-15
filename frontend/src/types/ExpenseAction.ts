import type {Expense} from './Expenses'

export type ExpenseAction =
    | {
        type: "ADD_EXP";
        expense?: Expense;
      }
    | {
        type: "REMOVE_EXP";
        expID?: string;
      }
    | {
    type: "LOAD_EXP";
    expenses: Expense[];
    }
    | {
    type : "UPDATE_EXP";
    expense: Expense;

};

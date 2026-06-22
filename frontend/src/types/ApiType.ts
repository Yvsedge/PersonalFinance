import type{Expense} from './Expenses'

export type DashboardResponse = {
    expenses: Expense[];
};

export type DExpenditure = {
    content : {date : Date, total : number}[],
}

export type MExpenditure = {
    content : {month : Date, total : number}[],
}

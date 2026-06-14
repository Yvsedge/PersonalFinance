export type Expense = {
    id : string;
    name : string;
    amount : number;
    category : "Food" | "Travel" | "Shopping" | "Bills" | "--";
    flow : "Income" | "Expense";
    date : string;
}

CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    category TEXT NOT NULL,
    flow TEXT NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE users ( 
    id UUID PRIMARY KEY, 
    firstname TEXT NOT NULL, 
    lastname TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL
);

CREATE TABLE expenses ( 
    id UUID PRIMARY KEY, 
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, 
    name TEXT NOT NULL, 
    amount NUMERIC NOT NULL, 
    category TEXT, 
    flow TEXT NOT NULL, 
    date DATE NOT NULL 
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR NOT NULL,
    salt VARCHAR(50) NOT NULL,
    profile_picture VARCHAR(255),
    monthly_budget NUMERIC
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    name VARCHAR(50) NOT NULL,
    limit NUMERIC(10),
    created_at TIMESTAMP WITHOUT TIME ZONE
)

CREATE TABLE balance (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users NOT NULL,
    value NUMERIC NOT NULL
)

CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users NOT NULL,
    category_id INTEGER REFERENCES categories NOT NULL,
    description VARCHAR(300),
    value NUMERIC NOT NULL,
    date DATE NOT NULL
)
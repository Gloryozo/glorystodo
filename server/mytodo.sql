-- Drop the mytask table if it exists
DROP TABLE IF EXISTS mytask;

-- Drop the account table if it exists
DROP TABLE IF EXISTS account;

-- Create the account table
CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the mytask table with user_id to link tasks to users
CREATE TABLE mytask (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
   
);

-- Insert sample data into the account table
INSERT INTO account(email, password) VALUES ('user1@example.com', 'password1');
INSERT INTO account(email, password) VALUES ('user2@example.com', 'password2');

-- Insert sample data into the mytask table, linking to a user
INSERT INTO mytask(description) VALUES ('Doing the dishes'); 
INSERT INTO mytask(description) VALUES ('Washing the car');   

// Import the 'fs' module for file system operations
import fs from 'fs';
// Import the 'path' module to handle file and directory paths
import path from 'path';
// Import the database connection pool from the 'db.js' module
import { pool } from './db.js';
// Import the 'hash' function from the 'bcrypt' module
import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'; // Default import for CommonJS module
const { sign } = jwt; // Destructure to get the sign function


// Define __dirname to get the directory name of the current module
// Note: `import.meta.url` is used to derive the directory name in ES modules
const __dirname = import.meta.dirname;

/**
 * Function to initialize the test database.
 * It reads the SQL commands from a file and executes them to set up the database schema.
 */
const initializeTestDatabase = () => {
    // Read the SQL file containing database initialization commands
    // The file is located one directory up from the current module
    const sql = fs.readFileSync(path.resolve(__dirname, "../mytodo.sql"), "utf8");

    // Execute the SQL commands to set up the database
    pool.query(sql);
};

// Define a test user object for inserting test user with sample data
// Define a function to insert a test user into the database with sample data
const insertTestUser = (email, password) => {
    // Hash the provided password with a salt round of 10
    hash(password, 10, (error, hashedPassword) => {
        // Insert the email and hashed password into the 'account' table
        pool.query(
            'INSERT INTO account (email, password) VALUES ($1, $2)',
            [email, hashedPassword]
        );
    });
};

// Define a function to generate a JWT token for a user
const getToken = (email) => {
    // Sign a new JWT token with the user's email and a secret, set to expire in 1 hour
    return sign({ user: email }, process.env.JWT_SECRET_KEY);
};

// Export the functions so they can be used in other modules
export { initializeTestDatabase, insertTestUser, getToken };
// Import the 'fs' module for file system operations
import fs from 'fs';
// Import the 'path' module to handle file and directory paths
import path from 'path';
// Import the database connection pool from the 'db.js' module
import { pool } from './db.js';
// Import the 'hash' function from the 'bcrypt' module
import { hash } from 'bcrypt';

// Define __dirname to get the directory name of the current module
// Note: `import.meta.url` is used to derive the directory name in ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * Function to initialize the test database.
 * It reads the SQL commands from a file and executes them to set up the database schema.
 */
const initializeTestDatabase = async () => {
    // Read the SQL file containing database initialization commands
    // The file is located one directory up from the current module
    const sql = fs.readFileSync(path.resolve(__dirname, "../mytodo.sql"), "utf8");

    // Execute the SQL commands to set up the database
    await pool.query(sql);
};

// Define a test user object for inserting test user with sample data
const insertTestUser = (email, password) => {
   hash(password,10, (error, hashedPassword) => {
    pool.query ('insert into account (email, password) values ($1, $2)',
        [email, hashedPassword])
        });
}


// Export the function so it can be used in other modules
export { initializeTestDatabase, insertTestUser };

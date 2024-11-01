import dotenv from 'dotenv'; // Import the dotenv package to read environment variables 
import pkg from 'pg'; // Import the pg package for PostgreSQL database interaction

const environment = process.env.NODE_ENV; // Get the current environment
dotenv.config();

const { Pool } = pkg; // Destructure Pool from the pg package to handle database connections

// Function to open a connection to the database
const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER, // Database username
        host:  process.env.DB_HOST, // Database host
        database: process.env.NODE_ENV === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME, // Database name
        password:  process.env.DB_PASSWORD, // Database password
        port:  process.env.DB_PORT, // Database port (default for PostgreSQL)
    });
    return pool; // Return the pool of database connections
}

const pool = openDb(); // Open a connection to the database
export { pool }

// Import the necessary modules
import express from 'express'; // Import the Express module for creating the server
import cors from 'cors'; // Import CORS to allow cross-origin requests
import pkg from 'pg'; // Import the pg package for PostgreSQL database interaction

// Set the port number where the server will listen for requests
const port = 3001; 
const { Pool } = pkg; // Destructure Pool from the pg package to handle database connections
const app = express(); // Create an instance of an Express application

// Middleware to enable CORS and parse incoming JSON and URL-encoded data
app.use(cors()); // Allow requests from different origins
app.use(express.json()); // Parse JSON data in requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data

// Define a GET route for the root URL
app.get('/', (req, res) => {
    const pool = openDb(); // Open a connection to the database

    // Query the database to get all tasks
    pool.query('select * from mytask', (error, result) => {
        if (error) {
            // If there's an error, send a 500 status with the error message
            return res.status(500).json({ error: error.message });
        } 
        // If successful, send a 200 status with the list of tasks
        return res.status(200).json(result.rows);
    });
});

// Define a POST route to create a new task
app.post('/create', (req, res) => {
    const pool = openDb(); // Open a connection to the database
    
    // Insert a new task into the database
    pool.query('insert into mytask (description) values ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            // If there's an error, send a 500 status with the error message
            return res.status(500).json({ error: error.message });
        }
        // If successful, send a 201 status with the ID of the new task
        return res.status(201).json({ id: result.rows[0].id });
    });
});

// Define a DELETE route to remove a task by ID
app.delete('/delete/:id', (req, res) => {
    const pool = openDb(); // Open a connection to the database
    const id = parseInt(req.params.id); // Get the ID from the request parameters and convert it to an integer

    // Delete the task with the specified ID from the database
    pool.query('delete from mytask where id=$1', [id], (error, result) => {
        if (error) {
            // If there's an error, send a 500 status with the error message
            return res.status(500).json({ error: error.message });
        }
        // If successful, send a 200 status with the deleted task's ID
        return res.status(200).json({ id: req.params.id });
    });
});

// Function to open a connection to the database
const openDb = () => {
    const pool = new Pool({
        user: 'postgres', // Database username
        host: 'localhost', // Database host
        database: 'Glory_todo', // Database name
        password: 'Gliffy', // Database password
        port: 5432, // Database port (default for PostgreSQL)
    });
    return pool; // Return the pool of database connections
}

// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`); // Log a message when the server starts
});

// Import the necessary modules
import express from 'express'; // Import the Express module for creating the server
import cors from 'cors'; // Import CORS to allow cross-origin requests
import myTodoRouter from './routes/myTodoRouter.js'; // Import the router object from the myTodoRouter.js file
import userRouter  from './routes/userRouter.js'; // Import the router object from the userRouter.js file

import dotenv from 'dotenv';
dotenv.config();
// Set the port number where the server will listen for requests
const port = process.env.PORT 
const app = express(); // Create an instance of an Express application

// Middleware to enable CORS and parse incoming JSON and URL-encoded data
app.use(cors()); // Allow requests from different origins
app.use(express.json()); // Parse JSON data in requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use('/', myTodoRouter);     // Use the myTodoRouter for requests to the root URL
app.use('/user', userRouter);   // Use the userRouter for requests to the /user URL

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.stack);
    res.status(statusCode).json({error: err.message});
});


// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`); // Log a message when the server starts
});


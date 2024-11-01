import { pool } from '../helper/db.js'; // Import the pool object from the db.js file   
import { Router } from 'express';

const router = Router(); // Create a new router

router.get('/', async (req, res) => {
    pool.query('select * from mytask', (error, result) => {
        if (error) {
            // If there's an error, send a 500 status with the error message
            return res.status(500).json({ error: error.message });
        } 
        // If successful, send a 200 status with the list of tasks
        return res.status(200).json(result.rows);
    });
});

router.post('create', async (req, res) => {
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

router.delete('delete/:id', async (req, res) => {
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


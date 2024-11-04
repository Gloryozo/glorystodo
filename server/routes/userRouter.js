import { pool } from '../helper/db.js'; // Import the pool object from the db.js file
import { Router } from 'express';
import { hash,compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt

const router = Router(); // Create a new router

router.post('/register', async (req, res, next) => {
    hash(req.body.password, 10, (error, hashedPassword) => {
        if (error) next(error) //Hash error
       try {
         pool.query('insert into account (email, password) values ($1, $2) returning *', 
            [req.body.email, hashedPassword],
            (error, result) => {
            if (error) 
                return next(error) //DataBase error.
            return res.status(201).json({ id: result.rows[0].id,email: result.rows[0].email });
        }
    );
       } catch (error) {
        return next(error)
       }
    })
    // Insert a new user into the database
});

export default router // Export the router object
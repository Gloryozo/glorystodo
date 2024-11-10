import { pool } from '../helper/db.js'; // Import the pool object from the db.js file
import { Router } from 'express';
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt;


const router = Router(); // Create a new router

router.post('/register', async (req, res, next) => {
    console.log('POST /register - Request body:', req.body); // Log the request body

    hash(req.body.password, 10, (error, hashedPassword) => {
        if (error) {
            console.error('Error hashing password:', error); // Log hashing error
            return next(error); // Hash error
        }
        
        try {
            pool.query('insert into account (email, password) values ($1, $2) returning *', 
                [req.body.email, hashedPassword],
                (error, result) => {
                    if (error) {
                        console.error('Error inserting user into database:', error); // Log database error
                        return next(error); // Database error
                    }
                    console.log('User registered successfully:', result.rows[0]); // Log the new user
                    return res.status(201).json({ id: result.rows[0].id, email: result.rows[0].email });
                }
            );
        } catch (error) {
            console.error('Error during registration process:', error); // Log error during registration
            return next(error);
        }
    });
    // Insert a new user into the database
});

router.post('/login', (req, res, next) => {
    const invalid_message = 'Invalid credentials.';
    console.log('POST /login - Request body:', req.body); // Log the request body

    try {
        pool.query('select * from account where email=$1', 
            [req.body.email], 
            (error, result) => {
                if (error) {
                    console.error('Error fetching user from database:', error); // Log database error
                    return next(error); // Database error
                }
                if (result.rowCount === 0) {
                    console.warn('Login attempt with non-existent email:', req.body.email); // Log warning for non-existent email
                    return next(new Error(invalid_message)); // Email not found
                }
                console.log('User fetched from database:', result.rows[0]);
                console.log('Password from request:', req.body.password);
                compare(req.body.password, result.rows[0].password, (error, match) => {
                    if (error) {
                        console.error('Error comparing passwords:', error); // Log hash comparison error
                        return next(error); // Hash error
                    }
                    if (!match) {
                        console.warn('Password mismatch for email:', req.body.email); // Log warning for password mismatch
                        return next(new Error(invalid_message)); // Password is incorrect
                    }
                    
                    const token = sign({ user: req.body.email }, process.env.JWT_SECRET_KEY || 'default_secret_key');
                    const user = result.rows[0];
                    console.log('User logged in successfully:', { id: user.id, email: user.email }); // Log successful login
                    return res.status(200).json({
                        id: user.id, 
                        email: user.email, 
                        token: token
                    });
                });
            }
        );
    } catch (error) {
        console.error('Error during login process:', error); // Log error during login
        return next(error);
    }
});

export default router; // Export the router object

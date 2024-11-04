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

router.post('/login', async (req, res, next) => {
    const invalid_message = 'Invalid credentials.'
    try {
        pool.query('select * from account where email=$1', 
            [req.body.email], async (error, result) => {
            if (error) return next(error) //DataBase error.
            if (result.rowCount === 0) return next(new Error( invalid_message )) //Email not found.
              compare(req.body.password, result.rows[0].password, (error, match) => {
                if (error) return next(error) //Hash error.
                if (!match) return next(new Error(invalid_message)) //Password is incorrect.
                const token = sign({ id: result.rows[0].id, email: result.rows[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' })
                const user = result.rows[0]
                return res.status(200).json(
                    {   'id': user.id, 
                        'email': user.email, 
                        'token': token 

                    }
                )
            })
        })
        } catch (error) {
            return next(error)
        }   
    });
   
export default router // Export the router object
//import { pool } from '../helper/db.js'; // Import the pool object from the db.js file
import { Router } from 'express';
//import { hash, compare } from 'bcrypt';
//import jwt from 'jsonwebtoken';
//const { sign } = jwt;
import { postLogin, postRegistration } from '../controllers/UserController.js';


const router = Router(); // Create a new router

router.post('/register', postRegistration) 

router.post('/login',postLogin) 

export default router; // Export the router object

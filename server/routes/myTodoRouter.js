//import { pool } from '../helper/db.js'; // Import the pool object from the db.js file   
import { Router } from 'express';
//import { emptyOrRows } from '../helper/utils.js';
//import { auth } from '../helper/auth.js';
import { deleteTask, getTasks, postTask } from '../controllers/TaskController.js';

const router = Router(); // Create a new router

router.get('/', getTasks);

router.post('/create', postTask) 

router.delete('/delete/:id', deleteTask) 

export default router; // Export the router object

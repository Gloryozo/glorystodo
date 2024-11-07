import { pool } from '../helper/db.js'; // Import the pool object from the db.js file   
import { Router } from 'express';
import { emptyOrRows } from '../helper/utils.js';
import { auth } from '../helper/auth.js';

const router = Router(); // Create a new router

router.get('/', (req, res, next) => {
       pool.query('select * from mytask', (error, results) => {
        if (error) {
          return next(error);
        } 
        console.log('Tasks fetched successfully:', results.rows); // Log the result
        return res.status(200).json(emptyOrRows(results));
    });
});

router.post('/create', auth, (req, res, next) => {
    pool.query('insert into mytask (description) values ($1) returning *',
        [req.body.description],
        (error, results) => {
            if (error) return next(error)
            return res.status(200).json({ id: results.rows[0].id })
        })
})

router.delete('/delete/:id',auth, (req, res, next) => {
    const id = parseInt(req.params.id);
    pool.query('delete from mytask where id = $1',
        [id],
        (error, results) => {
            if (error) return next(error)
            return res.status(200).json({ id })
        })
})

export default router; // Export the router object

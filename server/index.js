import express from 'express';
import cors from 'cors';
import pkg from 'pg';


const port = 3001;
const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    const pool = openDb();
//res.status(200).json({ result: 'Welcome to Glory Todo API' });


pool.query('select * from mytask', (error, result)=>{
    if (error) {
        return res.status(500).json({ error: error.message });
    } 
    return res.status(200).json(result.rows);
    });
  });

  app.post('/create', (req, res) => {
    const pool = openDb();
    
    pool.query('insert into mytask (description) values ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(201).json({ id: result.rows[0].id });
    })
});

app.delete('/delete/:id', (req, res) => {
    const pool = openDb();
    const id = parseInt(req.params.id)
    pool.query('delete from mytask where id=$1', [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ id: req.params.id });
    })
});

  const openDb = () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Glory_todo',
    password: 'Gliffy',
    port: 5432,
  });
  return pool;
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

import { pool } from '../helper/db.js';

const selectAllTasks = async () => {
    return await pool.query('select * from mytask')
}

const createTask = async (description) => {
    return await pool.query('insert into mytask (description) values ($1) returning *', [description])
}

const removeTask = async (id) => {
    return await pool.query('delete from mytask where id = $1', [id])
}

export { selectAllTasks, createTask, removeTask };
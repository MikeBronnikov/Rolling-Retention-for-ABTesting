import PG from 'pg';

const Pool = PG.Pool;
const pool = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'testtask'
})

export default pool
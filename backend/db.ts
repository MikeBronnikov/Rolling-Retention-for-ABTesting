import PG from 'pg';

const Pool = PG.Pool;
const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: { rejectUnauthorized: false }
})

export default pool

// user: 'postgres',
// password: '123456',
// host: 'localhost',
// port: 5432,
// database: 'testtask'
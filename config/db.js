import pg from "pg";
process.loadEnvFile();
const { Pool } = pg;

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;
const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
}

export const pool = new Pool(config)
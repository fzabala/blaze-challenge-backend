import { Pool, QueryResult } from "pg";
import { logger } from "../utils";
// Load environment variables from the .env file
require('dotenv').config();

const isTestEnvironment = process.env.NODE_ENV === 'test';

// Database connection configuration
export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB,
});

export const connect = async () => {
    try {
        const client = await pool.connect();
        logger.info('Connected to PostgreSQL database');
        client.release();
    } catch (err) {
        logger.error('Error connecting to the database', err.stack);
        throw new Error('Error connecting to the database');
    }
};

export const query = async (sql: string, params: any[] = []): Promise<QueryResult> => {
    try {
        const client = await pool.connect();
        const result = await client.query(sql, params);
        client.release();
        return result;
    } catch (err) {
        logger.error('Error executing query', err.stack);
        console.error('Error executing query', err.stack);
        throw new Error('Error executing query');
    }
};

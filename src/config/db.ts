import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'kanto',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'etudiants_bd'
});

export async function checkConnection(): Promise<boolean> {
  const client = await pool.connect();
  try {
    return true;
  } finally {
    client.release();
  }
}

export { pool };
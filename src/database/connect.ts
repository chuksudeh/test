import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
});

export default {
  query: (text: string, params: any[] | undefined[]) =>
    pool.query(text, params),
};

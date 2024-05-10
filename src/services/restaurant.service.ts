import { pool } from "../database/connect";

export const getAllRestaurant = async () => {
  const result = await pool.query("select * from restaurants");
  return result;
};

export const getOneRestaurant = async (id: string) => {
  const query = `SELECT * FROM restaurants WHERE id = $1`;
  const values = [id];
  const result = await pool.query(query, values);
  if (result.rows.length == 0) {
    throw new Error("Result not found");
  }
  return result;
};

export const createRestaurants = async (body: any) => {
  const { name, price_range, location } = body;
  const insertQuery = `
  INSERT INTO restaurants (name, price_range, location)
  VALUES ($1, $2, $3)
  RETURNING *
 `;
  const values = [name, price_range, location];
  const result = await pool.query(insertQuery, values);
  return result;
};

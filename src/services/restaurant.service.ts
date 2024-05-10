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

export const updateOneRestaurant = async (id: string, body: any) => {
  const { name, price_range, location } = body;
  const updateQuery = `
    UPDATE restaurants 
    SET name = $1, price_range = $2, location = $3 
    WHERE id = $4 
    RETURNING *
  `;
  const values = [name, price_range, location, id];
  const result = await pool.query(updateQuery, values);

  if (result.rows.length === 0) {
    throw new Error("Restaurant not found for update");
  }

  return result;
};

export const deleteOneRestaurant = async (id: string) => {
  const deleteQuery = `
    DELETE FROM restaurants 
    WHERE id = $1
    RETURNING *
  `;
  const values = [id];
  const result = await pool.query(deleteQuery, values);

  if (result.rows.length === 0) {
    throw new Error("Restaurant not found for delete");
  }

  return result;
};

export const deleteAllRestaurants = async () => {
  const deleteAllQuery = `
    DELETE FROM restaurants
    RETURNING *
  `;
  const result = await pool.query(deleteAllQuery);

  if (result.rows.length === 0) {
    throw new Error("No restaurants to delete");
  }

  return result;
};

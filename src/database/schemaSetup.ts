// schemaSetup.js

import { pool } from "./connect";
import {
  githubUserSchema,
  programmingLanguageSchema,
} from "./githubuser.model";

const createSchemas = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(githubUserSchema);
    await client.query(programmingLanguageSchema);
    await client.query("COMMIT");
    console.log("Schemas created successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating schemas", error);
  } finally {
    client.release();
  }
};

export default createSchemas;

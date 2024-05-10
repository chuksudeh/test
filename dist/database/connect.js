"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const port = process.env.PORT ? parseInt(process.env.PORT) : undefined;
const pool = new pg_1.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: port,
});
exports.default = pool;

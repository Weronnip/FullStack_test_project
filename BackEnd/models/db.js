import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import "dotenv/config"

const connection = await mysql.createConnection({
        host: process.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    })


export const db = drizzle(connection)

try {
    console.log('The database was successfully connected');
} catch (error) {
    console.log('Error: ', error);
}
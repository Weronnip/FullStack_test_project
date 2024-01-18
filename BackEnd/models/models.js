// import modules from library
import { mysqlTable, varchar, int } from 'drizzle-orm/mysql-core';

// about model table
export const product = mysqlTable('foods', {
    id: int('id').primaryKey() .autoincrement(),
    name: varchar('name', {length: 50}),
    about: varchar('about', {length: 300}),
    price: int('price'),
});
import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { integer } from 'drizzle-orm/pg-core';

export const product = mysqlTable('foods', {
    name: varchar('name', {length: 50}),
    about: varchar('about', {length: 300}),
    price: integer('price'),
});
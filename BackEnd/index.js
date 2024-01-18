// imports library and modules from the project
import { product, product as productsTable } from './models/models.js';
import bodyParser from 'body-parser';
import { db } from "./models/db.js";
import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import { eq } from 'drizzle-orm';

// setting
const app = express();
const __dirname = path.resolve();
const S_NAME = process.env.SERVER_NAME;
const PORT = process.env.SERVER_PORT;

// we use the method from the libraries
app.use(cors());
app.use(express.static(path.join(__dirname, '../FrontEnd')));
app.use(express.static(path.join(__dirname, '../FrontEnd/js')));
app.use(express.static(path.join(__dirname, '../FrontEnd/style')));
// json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// get query
function Get() {
    
    return (
            app.get('/', async (req, res) => {
                res.sendFile(path.join(__dirname, '../FrontEnd', 'index.html'));
            }),

            app.get('/edit', async (req, res) => {
                res.sendFile(path.join(__dirname, '../FrontEnd', 'edit.html'));
            }),

            app.get('/api/products', async(req, res) => {
                const product = await db.select().from(productsTable);
                res.json(product)
            }),
            
            app.get('/api/products/:id', async (req, res) => {
                const id = req.params.id;
                const product = await db.select().from(productsTable).where(eq(productsTable.id, id))
                if (product) {
                    res.json(product);
                } else {
                    res.status(404).send('Product not found');
                }
            }),

            // Request verification  
            app.get('/test', (req, res) => {
            res.send('Okay')
        })
    )
}

// post query
function Post() {
    return (
        // create record in database
        app.post('/product', async (req, res) => {
            await db.insert(productsTable).values(req.body)
            res.send('The data has been add successfully, <a href="/">Home</a>')
        })
    );
}

// edit under development (does not work)
function Edit() {
    return (
        app.patch('/api/products/:id', async (req, res) => {
            await db.update(productsTable).set({ name: req.body, about: req.body, price: req.body})
            res.send('The edit data has been edits successfully, <a href="/">Home</a>')
        })
    );
}

function Delete() {
    return(
     app.delete('/api/products/:id', async (req, res) => {
        const id = req.params.id;
        const product = await db.delete().from(productsTable).where(eq(productsTable.id, id))
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
     })
    )
}

// Starting the server function
function Server() {    
    Get();
    Post();
    Edit(); // does not work
    Delete();

    // Checking on error
    try {
        app.listen(PORT, () => {
            console.log(`\nServer starting to do address: ${S_NAME + PORT}`);
        })
    } catch (error) {
        console.log('Error in: ', error);
    }
}

Server()
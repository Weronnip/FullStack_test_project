// imports library and modules from the project
import { product as productsTable } from './models/models.js';
import bodyParser from 'body-parser';
import { db } from "./models/db.js";
import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";

// setting
const app = express();
const __dirname = path.resolve();
const S_NAME = process.env.SERVER_NAME;
const PORT = process.env.SERVER_PORT;

// we use the method from the libraries
app.use(cors());
app.use(express.static(path.join(__dirname, '../FrontEnd')));
app.use(express.static(path.join(__dirname, '../FrontEnd/style')));
app.use(express.static(path.resolve(__dirname, '../FrontEnd/javascript')));

// json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// get query
function Get() {
    
    app.get('/', async (req, res) => {
        const product = await db.select().from(productsTable);
        res.send(product)
        res.sendFile(__dirname, '../FrontEnd', 'index.html')
    })
    
    // Request verification  
    app.get('/test', (req, res) => {
        res.send('Okey')
    })
}

// post query
function Post() {
    return (
        // create record in database
        app.post('/product', async (req, res) => {
            await db.insert(productsTable).values(req.body)
            res.send('The data has been added successfully, <a href="/">Home</a>')
        })
    );
}

// Starting the server function
function Server() {    
    Get();
    Post();

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
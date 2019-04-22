import express from "express";
import logger from "./providers/Logger.mjs";
// Load environment variables
import dotenv from 'dotenv';
import cors from 'cors';
import BooksController from "./controllers/BooksController.mjs";

dotenv.load();

// Init Express app
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const bookController = new BooksController();

app.get("/books/:searchTerm?", bookController.getBooks);
app.post("/books", bookController.createBook);
app.delete("/books/:id", bookController.deleteBook);

app.listen(port, function () {
    logger.info(`Application is running on port `,port);
    console.log("App is running on " + port);
}).on('error', console.log);
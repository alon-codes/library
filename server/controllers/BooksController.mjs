import logger from "../providers/Logger.mjs";
import Book from "../models/BookModel.mjs";
import BooksService from "../services/BooksService.mjs";

export default class BooksController {

    /**
     * Gets recently added books by default
     * When searchTerm is specified will filter by
     * the searchTerm
     */
    async getBooks(req, res){
        const searchTerm = req.params.searchTerm;
        try {
            let books = [];
            const booksService = new BooksService();

            if(!searchTerm || searchTerm.length == 0){
                books = await booksService.getRecent();
            } else {
                books = await booksService.findBooks(searchTerm);
            }

            const booksObjects = Book.parseListFromDB(books);
            logger.info(`Fetching books`,JSON.stringify(booksObjects));

            return res.send(Book.parseListToResponse(booksObjects));
        }
        catch(e){
            logger.error(`Cannot fetch books ${e}`);
            return res.status(400).send(e);
        }
    }

    /**
     * Create book by passing relevant data 
     */
    async createBook(req, res) {
        const { title, date, author } = req.body;
        
        // TODO: add validations here
    
        const bookObj = new Book();
        bookObj.title = title;
        bookObj.author = author;
        bookObj.date = date;
    
        try {
            const booksService = new BooksService();
            const createdBook = await booksService.addBook(bookObj);
            bookObj.id = createdBook._id;
            return res.send(Book.parseObjectToResponse(bookObj));
        }
        catch(e){
            console.error(e);
            return res.status(400).send(e);
        }
    }

    /**
     * Deletes a book with specific id 
     */
    async deleteBook(req, res){
        const { id } = req.params;

        if(!id){
            return res.status(400).send({error: Errors.MISSING_ID});
        }

        const booksService = new BooksService();
        const result = await booksService.deleteBook(id);

        if(!result){
            return res.status(400).send();
        }

        return res.send();
    }
}
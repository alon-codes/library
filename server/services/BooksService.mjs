import elasticClient from '../providers/ElasticInstance.mjs'
import logger from '../providers/Logger.mjs';

const booksIndexName = "book";

export default class BooksService {    
    async addBook(book){
        try {
            const result = await elasticClient.index({
                body: book,
                index: booksIndexName
            });

            logger.log(`Successfully create book`, book);

            return result.body;
        }
        catch (e) {
            logger.error(`Error creating book`, e);
            return result;
        }   
    };
    
    /**
     * Get recent books from elasticsearch
     */
    async getRecent(){
        try {
            const result = await elasticClient.search({
                index: booksIndexName
            });

            console.log(`Books`, result);

            logger.log(`Books`, result);

            return result.body;
        }
        catch (e) {
            console.log(`Error creating book`, e);
            logger.error(`Error creating book`, e);
            return [];
        }
    };

    /**
     * Find books from elasticsearch
     */
    async findBooks(searchTerm){
        try {
            const result = await elasticClient.search({
                index: booksIndexName,
                q: searchTerm
            });

            logger.log(`Successfully found matching books`, result);
            return result.body;
        }
        catch (e) {
            logger.error(`Error find book that matches this search term`, searchTerm);
            return null;
        }
    };

    /**
     * Delete's book from elasticsearch
     */
    async deleteBook(id){
        try {
            await elasticClient.delete({
                index: booksIndexName,
                id: id
            });
            logger.log(`Successfully delete book with the id`, id);
            return true;
        }
        catch(e){
            logger.error(`Error delete book with the id`, id);
            return false;
        }
    }
}


export default class Book {

    constructor(){
        this.id = '';
        this.author = '';
        this.date = '';
        this.title = '';
    }
    
    static parseListFromDB(raw){
        if(!raw.hits || !raw.hits.hits){
            return [];
        }
        return raw.hits.hits.map(Book.parseObjectFromDB);
    }

    /**
     * Takes raw elastic search object as parameter
     * and returns Book object
     */
    static parseObjectFromDB(raw){
        if(!raw._source){
            return null;
        }
        const { _id, author, date, title } = raw._source;
        const parsedBook = new Book();
        parsedBook.id = raw._id;
        parsedBook.author = author;
        parsedBook.date = date;
        parsedBook.title = title;
        return parsedBook;
    };

    static parseListToResponse(books){
        return books.map(b => Book.parseObjectToResponse(b));
    }

    /**
     * Converts Book object to raw JSON
     */
    static parseObjectToResponse(bookObj){
        return {
            title: bookObj.title,
            author: bookObj.author,
            id: bookObj.id,
            date: bookObj.date
        }
    }
}
import { observable, runInAction, action, transaction } from 'mobx';
import axios from 'axios';
import { SERVER_URL } from "../Config";
import { getDateStr } from "../Helpers";

class BooksStore {
    books = observable([]);
    isOpen = observable.box(false);
    isEditingMode = observable.box(false);
    currentBook = observable({});

    constructor(){
        this.getData();
        this.isOpen.observe((change) => {
            console.log(`Is open value is changed`, change);
        })
    }

    static sortBooks(b1, b2){
        return b1.id.localeCompare(b2.id);
    }

    setBooks = (nBooks) => {
        transaction(() => {
            const sortedBooks = nBooks.sort(BooksStore.sortBooks);
            const convertedBooks = sortedBooks.map((book) => {
                book.date = getDateStr(new Date(book.date))
                return book;
            });
            this.books.replace(convertedBooks);
        });
    }

    /**
     * Making request to the server
     */
    searchBooks = (searchTerm) => {
        axios.get(`${SERVER_URL}/books/${searchTerm}`).then(res => {
            if (Array.isArray(res.data)) {
                this.setBooks(res.data);
            }
        });
    }

    /**
     * Making request to the server
     */
    getData = () => {
        axios.get(SERVER_URL + "/books").then(res => {
            if (Array.isArray(res.data)) {
                this.setBooks(res.data);
            }
        });
    }

    isTitleExists(title, bookId){
        const sameTitleIndex = this.books.findIndex((b) => {
            return b.title === title && b.bookId !== bookId
        });

        return sameTitleIndex < 0;
    }

    saveBookChanges = (book) => {
        if(book.bookId.length === 0)
            return this.addNewBook(book.title, book.date);

        const bookIndex = this.books.findIndex((b) => b.id === book.id);
        transaction(() => {
            this.books[bookIndex] = book;
            this.isOpen.set(false);
        });
    }

    enterEditMode = (book, isCreation) => {
        transaction(() => {
            this.isOpen.set(true);
            this.currentBook = book;
            this.isEditingMode.set(!isCreation);
        });
    }

    exitEditMode = () => {
        transaction(() => {
            this.isOpen.set(false);
            if(!this.isEditingMode.get()){
                this.isEditingMode.set(false);
            }
        });
    }

    addNewBook(bookTitle, bookDate){
        // TODO: check this function, probably need to refactor
        const booksArrLength = this.books.length;

        const nBook = {
            date: bookDate,
            title: bookTitle
        };

        transaction(() => {
            this.books.push(nBook);
        });

    }
}

const store = new BooksStore();
window.store = store

export default store;
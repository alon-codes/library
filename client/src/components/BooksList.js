import React, {Component} from 'react';
import BookItem from './BookItem';
import Grid from '@material-ui/core/Grid';

import {inject, observer} from 'mobx-react';
import { withStyles } from '@material-ui/core';

class BooksList extends Component {
    constructor(props){
        super(props);

        this.state = {
            books: this.props.booksStore.books
        };

        this.openEditBox = this.openEditBox.bind(this);
        this.handleSingleBook = this.handleSingleBook.bind(this);
    }

    componentWillReceiveProps(props){
        console.log(props);

        this.setState({
            books: props.booksStore.books.toJS()
        });
    }

    openEditBox(book){
        this.props.booksStore.enterEditMode(book);
    }

    handleSingleBook(singleBook){
        const {
            author,
            date,
            title
        } = singleBook;

        const dateObj = new Date(date);

        return (
            <Grid xs={12} md={4} sm={6} item key={Math.random()}>
                <BookItem
                    onEdit={() => this.openEditBox(singleBook)}
                    author={author}
                    title={title}
                    date={date} />
            </Grid>
        );
    }

    render(){
        const elements = this.state.books.map(this.handleSingleBook);

        return (
            <Grid spacing={16} container>
                { elements }
            </Grid>
        );
    }
}

const booksListWithStore = inject("booksStore")(observer(BooksList));

export default booksListWithStore;
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import BookList from '../components/BooksList';
import SearchBox from '../components/SearchBox';
import {inject, observer} from 'mobx-react';

class LibraryRoute extends Component {
    performeSearch = (e) => {
        const searchTerm = e.target.value;
        this.props.booksStore.searchBooks(searchTerm);
    }

    render(){
        return (
            <Grid container>
                <SearchBox performeSearch={this.performeSearch} />
                <BookList />
            </Grid>
        );
    }
}

export default inject("booksStore")(observer(LibraryRoute));
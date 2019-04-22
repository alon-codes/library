import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import {inject, observer} from 'mobx-react';

class Header extends Component {
    performeSearch = (e) => {
        const searchTerm = e.target.value;
        
        // Search when the user typed something
        if(searchTerm.length > 0){
            this.props.booksStore.searchBooks(searchTerm);
        }
    }

    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        onChange={this.performeSearch}
                        label="Search book"
                        placeholder="Try book title,author or even words from the book" />
                </Grid>
            </Grid>
        );
    }
}

export default inject("booksStore")(observer(Header));
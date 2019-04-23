import React, { Component } from "react";
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

 const SearchBox = ({performeSearch}) => {
    return (
        <Grid item xs={12}>
            <TextField
                fullWidth
                onChange={performeSearch}
                label="Search book"
                placeholder="Try book title,author or even words from the book" />
        </Grid>
    )
}

export default SearchBox;
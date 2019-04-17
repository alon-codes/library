import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';

export default class Header extends Component {
    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <TextField fullWidth label="Search book" placeholder="Try book title,author or even words from the book" />
                </Grid>
            </Grid>
        );
    }
}
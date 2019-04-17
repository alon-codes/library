import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import BooksList from './BooksList';
import Credit from './Credit';
import {inject, observer} from "mobx-react";
import Header from './Header';
import BookModalHOC from './hoc/BookModalHOC';

const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiButton: {

        }
    },
    typography: {
        useNextVariants: true,
    },
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Header />
                <BooksList />
                <Credit />
                <BookModalHOC />
            </MuiThemeProvider>
        );
    }
}

export default observer(App);
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Credit from './Credit';
import {observer} from "mobx-react";
import Header from './header/Header';
import BookModalHOC from './hoc/BookModalHOC';
import LibraryRoute from '../routes/LibraryRoute';
import AboutRoute from '../routes/AboutRoute';
import CodeRoute from '../routes/CodeRoute';
import { BrowserRouter as Router, Route } from "react-router-dom";
import routes from '../Routes';

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
                <Router>
                    <Header />
                    <React.Fragment>
                        <Route exact path={routes.LIBRARY} component={LibraryRoute} />
                        <Route exact path={routes.ABOUT} component={AboutRoute} />
                        <Route exact path={routes.CODE} component={CodeRoute} />
                    </React.Fragment>
                </Router>
                <Credit />
                <BookModalHOC />                
            </MuiThemeProvider>
        );
    }
}

export default observer(App);
import React from 'react';
import ReactDOM from 'react-dom';

import "./App.css";

import App from './components/App';
import { Provider } from "mobx-react";
import booksStore from "./stores/BooksStore";

ReactDOM.render((
    <Provider booksStore={booksStore}>
        <App />
    </Provider>
), document.getElementById('root'));
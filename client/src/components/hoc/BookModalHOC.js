import React, { Component } from 'react';
import BookModal from '../BookModal';
import {inject, observer} from "mobx-react";

class BookModalHOC extends Component {

    constructor(props){
        super(props);
    }
    
    onClose = () => {
        this.props.booksStore.exitEditMode();
    }

    onSave = (book) => {
        // TODO: update the server with the new book details
        this.props.booksStore.exitEditMode();
        this.props.booksStore.saveBookChanges(book);
    }

    render(){
        console.log(`BookModalHOC::props`, this.props);
        const { isOpen, isEditingMode, currentBook } = this.props.booksStore;

        return (
            <BookModal
                onClose={this.onClose}
                onSave={this.onSave}
                currentBook={{...currentBook}}
                isOpen={isOpen.get()}
                isEditingMode={isEditingMode.get()}  />
        );
    }
}

export default inject("booksStore")(observer(BookModalHOC));
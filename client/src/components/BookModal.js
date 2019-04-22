import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';

import { isValidDateStr } from '../Helpers';

const getModalStyle = () => {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

const styles = theme => ({
    dialogField: {
        marginBottom: 40
    }
});

const bookModalTitles = {
    ADD: "Fill-out book details",
    EDIT: "Change book details"
};

class BookModal extends Component {

    static propTypes = {
    }

    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            isEditingMode: false,
            currentBook: null,
            errors: this.props.errors,
            titleError: "",
            dateError: ""
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        let nextState = {};
        console.log(`BookModal new props - `, nextProps);
        const { isOpen, currentBook, isEditingMode } = nextProps;

        if(isOpen !== prevState.isOpen){
            nextState.isOpen = isOpen;
        }

        if(currentBook !== prevState.currentBook){
            nextState.currentBook = currentBook;
        }

        if(isEditingMode != prevState.isEditingMode){
            nextState.isEditingMode = isEditingMode;
        }

        return nextState;
    }

    save(){

        const { currentBook } = this.state;
        const { booksStore } = this.props;

        let isValid = true;

        if(currentBook.title.length <= 0) {
            this.setState(prevState => {
                prevState.titleError = "Title can't be empty"
            });
            isValid = false;
        } else if(booksStore.isTitleExists(currentBook.title)){
            this.setState(prevState => {
                prevState.titleError = "Title already exists, try another"
            });
            isValid = false;
        }

        if(currentBook.date.length <= 0){
            this.setState(prevState => {
                prevState.dateError = "Date can't be empty"
            });
            isValid = false;
        } else if(!isValidDateStr(currentBook.date)) {
            this.setState(prevState => {
                prevState.dateError = "Date is not matching the format dd/mm/yyyy"
            });
            isValid = false;
        }

        if(isValid)
            booksStore.editBook(currentBook);
    }

    handleTitleChange(e){
        let nVal = e.target.value;

        if(nVal.length === 0)
            nVal = "";

        this.setState(prevState => prevState.currentBook.title = nVal);
    }

    handleDateChange(e){
        let nVal = e.target.value;

        if(nVal.length === 0)
            nVal = "";

        this.setState(prevState => prevState.currentBook.date = nVal);
    }

    render(){
        const {
            titleError,
            dateError,
            isOpen,
            isEditingMode
        } = this.state;

        const { onClose,onSave,classes } = this.props;
        
        console.log(`BookModal::Is modal open - `,isOpen);
        console.log(`BookModal::Is editing mode - `,isEditingMode);

        let titleErrorEle = null;
        let dateErrorEle = null;
        
        if (titleError.length > 0) {
            titleErrorEle = <span>{titleError}</span>;
        }

        if (dateError.length > 0) {
            dateErrorEle = <span>{dateError}</span>;
        }

        let bookTitle, date, title, author = "";

        const { currentBook } = this.state;

        if(isEditingMode){
            bookTitle = currentBook.title;
            date = new Date(currentBook.date);
            author = currentBook.author;
            title = bookModalTitles.EDIT;
        } else {
            bookTitle = "Untitled Book";
            date = new Date(); 
            author = "Unknown";
            title = bookModalTitles.ADD;
        }
        
        const dateStr = moment(date).format("YYYY-MM-D");

        console.log(`BookModal/render::dateStr`,dateStr);

        return (
            <Dialog fullWidth onExited={onClose} onClose={onClose} open={isOpen}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <Grid container>   
                        <Grid xs={12} item>        
                            <TextField className={classes.dialogField} fullWidth value={bookTitle} onChange={this.handleTitleChange} label="Book title" />
                            { titleErrorEle }
                            <TextField className={classes.dialogField} fullWidth value={author} onChange={this.handleTitleChange} label="Book author" />
                            <TextField
                                className={classes.dialogField} fullWidth
                                value={dateStr} type="date"
                                label="Book release date"
                                InputLabelProps={{ shrink: true }}  />
                            { dateErrorEle }
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onSave(currentBook)}>Save</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(BookModal);
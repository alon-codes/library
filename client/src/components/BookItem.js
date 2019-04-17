import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {formatDate} from "../Helpers";
import EditBook from "./buttons/EditBook";
import Typography from '@material-ui/core/Typography';

export default class BookItem extends Component {

    static propTypes = {
        author: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        onEdit: PropTypes.func.isRequired
    };

    render(){

        const { title, date, author, onEdit } = this.props;

        return (
            <Card className="book-item">
                <CardContent>
                    <Typography>{title}</Typography>
                    <Typography>{author}</Typography>
                    <Typography>{date}</Typography>
                    <CardActions>
                        <EditBook onClick={onEdit} />
                    </CardActions>
                </CardContent>
            </Card>
        )
    }
}
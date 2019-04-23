import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MainMenu from './MainMenu';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    changeRoute = (event, value) => {
        const { history } = this.props;
        history.push(value);
    }

    render(){
        const { pathname } = this.props.location;

        return (
            <Grid container>
                <MainMenu currentRoute={pathname} changeRoute={this.changeRoute} />
            </Grid>
        );
    }
}

export default withRouter(Header);
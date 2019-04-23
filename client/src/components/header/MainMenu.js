import React,{ Component } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import GitHubIcon from '../icons/GitHubIcon';
import routes from "../../Routes";
import {withRouter} from 'react-router';

const MainMenu = ({currentRoute, changeRoute}) => {
    return (
        <AppBar position="static" color="default">
            <Tabs
            value={currentRoute}
            onChange={changeRoute}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            >
                <Tab value={routes.LIBRARY} label="Library" />
                <Tab value={routes.ABOUT} label="About" />
                <Tab value={routes.CODE} label="Source Code" icon={<GitHubIcon />} />
            </Tabs>
        </AppBar>
    );
}

export default MainMenu;
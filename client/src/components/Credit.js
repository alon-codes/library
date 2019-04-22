import React from 'react';
import { Typography, Icon } from '@material-ui/core';

const credits =(props) => {
    return (
       <Typography>
           Source code can be found on
           <a href="https://github.com/alond2010">
                <Icon type="github-circle" />
           </a>
       </Typography>
    )
};

export default credits;
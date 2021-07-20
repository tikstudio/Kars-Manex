import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function Send(props) {
    const classes = useStyles();
    const {className, ...others} = props;

    return (
        <div>
            <Button
                {...others}
                variant="contained"
                color="primary"
                className={`${classes.button} ${className}`}
                endIcon={<Icon>send</Icon>}
            >
                Ուղարկել
            </Button>
        </div>
    );
}

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        position: 'fixed',
        top: '50px',
        zIndex: '10000',
    },
}));

export default function LinearLoad(props) {
    const classes = useStyles();
    const {className} = props;

    return (
        <div className={classes.root}>
            <LinearProgress className={className} color="secondary"/>
        </div>
    );
}

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));

export default function Avatars(props) {
    const classes = useStyles();
    const {src, alt, ...others} = props;

    return (
        <div className={classes.root}>
            <Avatar alt={alt} src={src}
                    {...others}
                    className={classes.large}
            />
        </div>
    );
}

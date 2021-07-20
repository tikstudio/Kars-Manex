import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
        root: {
            width: '75%',
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: '8px',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
            boxShadow: '3px 3px 5px black',
        },
    }))
;

export default function Search(props) {
    const classes = useStyles();
    const {placeholder, ...others} = props;
    return (
        <div className={classes.root}>
            <TextField
                {...others}
                label="Փնտրել"
                placeholder={placeholder}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
            />
        </div>
    );
}

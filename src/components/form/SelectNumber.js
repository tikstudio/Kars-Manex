import React, {Component} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import _ from 'lodash';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));
const classes = useStyles;

class SelectNumber extends Component {

    render() {
        const {data, label, value, onChange, optionName, style, ...others} = this.props;

        return (
            <div style={style}>
                <InputLabel id="demo-customized-select-label">
                    {label}</InputLabel>
                <FormControl className={classes.margin} style={{width: '100%'}}>
                    <Select
                        {...others}
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={value}
                        onChange={onChange}
                        input={<BootstrapInput/>}
                    >
                        <MenuItem value="">
                            <em>Ընտրել</em>
                        </MenuItem>
                        {_.map(_.sortBy(_.uniqBy(data, optionName), optionName), (value, key) => (
                            <MenuItem key={key} value={value[optionName]}>
                                {value[optionName]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default SelectNumber;

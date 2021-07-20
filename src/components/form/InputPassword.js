import React, {Component} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    width: {
        width: '100%',
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));
const classes = useStyles;

class InputPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        }
    }

    handleClickShowPassword = () => {
        const {showPassword} = this.state;
        this.setState({showPassword: !showPassword});
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        const {className, errors, value, onChange, label, ...props} = this.props;
        const {showPassword} = this.state;
        return (
            <div className={classes.root} style={{width: '100%'}}>
                <div style={{width: '100%'}}>
                    <FormControl className={clsx(classes.margin, classes.textField)}
                                 style={{width: '100%'}}
                                 error={!!errors}
                                 variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password"
                        >{label ? label : 'Գաղտնաբառ'}</InputLabel>
                        <OutlinedInput
                            {...props}
                            type={showPassword ? 'text' : 'password'}
                            value={value}
                            placeholder={'Գաղտնաբառ'}
                            className={className}
                            name={'password'}
                            onChange={onChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                        {errors ? <FormHelperText id="component-error-text">{errors}</FormHelperText> : undefined}
                    </FormControl>
                </div>
            </div>
        );
    }
}

export default InputPassword;

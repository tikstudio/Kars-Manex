import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

class Input extends Component {

    render() {
        const {name, label, className, errors, ...props} = this.props;
        return (
            <>
                <TextField
                    {...props}
                    error={!!errors}
                    label={label}
                    className={className}
                    variant="outlined"
                    helperText={errors ? errors : undefined}
                    name={name}
                    autoComplete="on"
                />
            </>
        );
    }
}

export default Input;

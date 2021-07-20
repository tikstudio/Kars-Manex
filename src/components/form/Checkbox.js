import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox(props) {
    const {label, value, onChange} = props;
    const [state, setState] = React.useState({
        checkedB: false,
    });

    const handleChange = async (event) => {
        setState({...state, [event.target.name]: event.target.checked});
        await onChange
    };

    return (
        <FormGroup row>
            <FormControlLabel
                control={
                    <Checkbox
                        value={value}
                        checked={state.checkedB}
                        onChange={handleChange}
                        name="checkedB"
                        color="primary"
                    />
                }
                label={label}
            />
        </FormGroup>
    );
}

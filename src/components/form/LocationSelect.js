import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'lodash';
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));
const classes = useStyles;
export default class LocationSelect extends Component {

  render() {
    const {label, data, value, vName, onChange, size, errors, ...others} = this.props;
    return (
      <FormControl variant="outlined" size={ size } className={ classes.formControl } style={ {width: '100%'} }
                   error={ !!errors }
      >
        <InputLabel htmlFor="outlined-age-native-simple">{ label }</InputLabel>
        <Select
          native
          { ...others }
          value={ value }
          onChange={ onChange }
          label={ label }
          inputProps={ {
            name: 'Ամբողջը',
            id: 'outlined-age-native-simple',
          } }
        >
          <option aria-label="None" value=""/>
          { _.map(data, (value, key) => (
            <optgroup label={ value[vName] } key={ key }>
              { _.map(value.city, (value, key) => (
                <option value={ value.id } key={ key }>{ value[vName] }</option>
              )) }
            </optgroup>
          )) }
        </Select>
        { errors ? <FormHelperText>{ errors }</FormHelperText> : null }
      </FormControl>
    );
  }
}

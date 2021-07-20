import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from "@material-ui/core";
import AutorenewSharpIcon from '@material-ui/icons/AutorenewSharp';

const ThemeProvider = withStyles({
  root: {
    backgroundColor: '#ba0101',
    borderColor: '#ba0101',
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
    '&:hover': {
      backgroundColor: '#b80000',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#a20000',
      borderColor: '#ba0101',
    },
  },
})(Button);

const StyledButton = withStyles({
  root: {
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
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Save(props) {
  const classes = useStyles();
  const {label, ...others} = props;
  return (
    <div>
      <StyledButton
        { ...others }
        variant="contained"
        color="primary"
        className={ classes.button }
        startIcon={ <SaveIcon/> }
      >
        { label }
      </StyledButton>
    </div>
  );
}

export function NormalButton(props) {
  const classes = useStyles();
  const {label, ...others} = props;

  return (
    <div>
      <StyledButton
        { ...others }
        variant="contained"
        size="small"
        className={ classes.button }
        startIcon={ <AutorenewSharpIcon/> }
      >
        { label }
      </StyledButton>
    </div>
  );
}

export function Delete(props) {
  const classes = useStyles();
  const {...others} = props;

  return (
    <ThemeProvider
      { ...others }
      variant="contained"
      color="secondary"
      className={ classes.button }
      startIcon={ <DeleteIcon/> }
    >
      Ջնջել
    </ThemeProvider>
  );
}

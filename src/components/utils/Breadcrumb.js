import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function handleClick(event) {}

export default function Breadcrumb(props) {
  const classes = useStyles();
  const { section1, section2, section3, label1, label2, label3 } = props;
  return (
    <div className={ classes.root }>
      <Breadcrumbs separator={ <NavigateNextIcon fontSize="small"/> } aria-label="breadcrumb">
        <Link color="inherit" to={ `/${ section1 }` } onClick={ handleClick }>
          { label1 }
        </Link>
        <Link color="inherit" to={ `/${ section1 }/${ section2 }/1` } onClick={ handleClick }>
          { label2 }
        </Link>
        <Link color="inherit" to={ `/${ section1 }/${ section2 }/${ section3 }` } onClick={ handleClick }>
          { label3 }
        </Link>
      </Breadcrumbs>
    </div>
  );
}

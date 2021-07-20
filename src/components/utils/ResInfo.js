import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={ 6 } variant="filled" { ...props } />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ResInfo(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    let {successFunc} = props;
    if (successFunc){
      successFunc();
    }
    if (reason === 'clickaway'){
      return;
    }
    setOpen(false);
  };

  const {value, res, msg, msg2} = props;
  console.clear();
  return (
    <div className={ classes.root }>
      <Snackbar open={ value ? open : false } autoHideDuration={ 5000 } onClose={ handleClose }>
        <Alert onClose={ handleClose } severity={ res }>
          { msg }
          <br/>
          { msg2 }
        </Alert>
      </Snackbar>
    </div>
  );
}
// error,warning,info,success

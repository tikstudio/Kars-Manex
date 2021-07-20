import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Delete } from "../form/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@material-ui/core";


export default function Access(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
    console.clear();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {onClick, label, text, button, className} = props;
  return (
    <div>
      { button ? <Tooltip
          onClick={ handleClickOpen }
          onFocus={ (event) => event.stopPropagation() }
          className={ 'delete__icon_button' } title="Հեռացնել" arrow>
          <Button className={ className }>
            <FontAwesomeIcon icon={ faTrashAlt } style={ {color: "red"} }/>
          </Button>
        </Tooltip> :
        <Delete variant="outlined" color="primary" onClick={ handleClickOpen }>
          Հեռացնել
        </Delete> }
      <Dialog
        open={ open }
        onClose={ handleClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ label }</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { text }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose } color="primary">
            Ոչ
          </Button>
          <Button onClick={ (event) => {
            event.preventDefault();
            handleClose();
            onClick();
          } } color="primary" autoFocus>
            Այո
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

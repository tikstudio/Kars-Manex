import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import { NavLink } from "react-router-dom";
import _ from 'lodash'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={ 0 }
    getContentAnchorEl={ null }
    anchorOrigin={ {
      vertical: 'bottom',
      horizontal: 'center',
    } }
    transformOrigin={ {
      vertical: 'top',
      horizontal: 'center',
    } }
    { ...props }
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: 'rgb(0, 0, 0 ,0.9)',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function MenuButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {data, status} = props;

  return (
    <div className="dNone md769">
      <MenuOutlinedIcon
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={ handleClick }/>
      <StyledMenu
        id="customized-menu"
        anchorEl={ anchorEl }
        keepMounted
        open={ Boolean(anchorEl) }
        onClose={ handleClose }
      >
        { status === 'request' ? 'Բեռնում․․․' :
          status === 'success' ? _.map(data.menu, (val, key) => (
            <NavLink
              className='menu__button'
              key={ key } to={ `/${ val.link }` }
              id={ val.link }
            >
              <StyledMenuItem>
                <ListItemIcon style={ {color: '#ba0101'} }>
                  <DragHandleIcon/>
                </ListItemIcon>
                <ListItemText primary={ val.name }/>
              </StyledMenuItem>
            </NavLink>
          )) : 'Խնդրում ենք թարմացնել էջը' }
      </StyledMenu>
    </div>
  );
}

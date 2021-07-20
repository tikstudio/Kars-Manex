import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '45.33%',
  },
  helper: {
    borderLeft: `2px solid ${ theme.palette.divider }`,
    padding: theme.spacing(1, 2),
  },
}));

export default function EditAccordion(props) {
  const classes = useStyles();
  const {media, form, saveButton} = props;
  return (
    <div className={ `${ classes.root } ${ media }` }>
      <Accordion defaultExpanded={ false } style={ {
        background: 'rgba(255, 255, 255, 0.35)',
      } }>
        <AccordionSummary
          expandIcon={ <ExpandMoreIcon/> }
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={ classes.column }>
            <Tooltip className={ classes.heading }
                     onClick={ (event) => {
                       event.stopPropagation();
                     } }
                     onFocus={ (event) => event.stopPropagation() }
                     title="Թարմացնել" arrow>
              <Button>
                <FontAwesomeIcon style={ {color: 'white'} } icon={ faUserEdit }/>
              </Button>
            </Tooltip>
          </div>
          <div className={ classes.column }>
            <Typography className={ classes.secondaryHeading }>Թարմացնել տվյալները</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={ classes.details }>
          { form }
        </AccordionDetails>
        <Divider/>
        <AccordionActions>
          { saveButton }
        </AccordionActions>
      </Accordion>
    </div>
  );
}

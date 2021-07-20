import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import DoneIcon from '@material-ui/icons/Done';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const {active, completed} = props;

  return (
    <div
      className={ clsx(classes.root, {
        [classes.active]: active,
      }) }
    >
      { completed ? <Check className={ classes.completed }/> : <div className={ classes.circle }/> }
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,lightcoral 0%,#ba0101 50%,#1b1b1b 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,lightcoral 0%,#ba0101 50%,#1b1b1b 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, lightcoral 0%,#ba0101 50%,#1b1b1b 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, lightcoral 0%,#ba0101 50%,#1b1b1b 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const {active, completed} = props;

  const icons = {
    1: <ContactMailIcon/>,
    2: <AssignmentLateIcon/>,
    3: <DoneIcon/>,
  };

  return (
    <div
      className={ clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      }) }
    >
      { icons[String(props.icon)] }
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: 'whitesmoke',
    textAlign: 'center',
  },
}));

function getSteps() {
  return ['Կոնտակտային տվյալներ', 'Մանրամասն տեղեկություն', 'Ավարտ'];
}

function getStepContent(step, firstChild, middleChild, lastChild) {
  switch ( step ) {
    case 0:
      return firstChild;
    case 1:
      return middleChild;
    case 2:
      return lastChild;
    default:
      return 'Անհայտ քայլ';
  }
}

export default function HorizontalStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={ classes.root }>
      <Stepper alternativeLabel activeStep={ activeStep } connector={ <ColorlibConnector/> }>
        { steps.map((label) => (
          <Step key={ label }>
            <StepLabel StepIconComponent={ ColorlibStepIcon }>{ label }</StepLabel>
          </Step>
        )) }
      </Stepper>
      <div>
        { activeStep === steps.length ? (
          <div>
            <Typography className={ classes.instructions }>
              Շնորհակալություն,<br/>
              Ձեր հայտարարությունը կհաստատվի 24 ժամվա ընթացքում․․․
            </Typography>
            <Button onClick={ handleReset } className={ classes.button }>
              Վերադառնալ
            </Button>
          </div>
        ) : (
          <div>
            <div
              className={ classes.instructions }>
              { getStepContent(activeStep, props.children[0], props.children[1], props.children[2]) }</div>
            <div>
              <Button disabled={ activeStep === 0 } onClick={ handleBack } className={ classes.button }>
                Նախորդը
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={ handleNext }
                className={ classes.button }
              >
                { activeStep === steps.length - 1 ? 'Ավարտ' : 'Հաջորդը' }
              </Button>
            </div>
          </div>
        ) }
      </div>
    </div>
  );
}

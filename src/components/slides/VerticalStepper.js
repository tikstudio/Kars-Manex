import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    root2: {
        background: 'none',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button2: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: "#ba0101",
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
        background: 'rgba(255,255,255,0.3)',
    },
}));

function getSteps() {
    return ['EXCLUSIVE REALTY', 'EXCLUSIVE CARS', 'EXCLUSIVE SHOP'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `Անշարժ գույքի առքուվաճառք։`;
        case 1:
            return 'Փոխադրամիջոցների առքուվաճառք։';
        case 2:
            return `Անշարժ գույքին և փոխադրամիջոցներին վերաբերող ցանկացած ապրանքի առքուվաճառք։`;
        default:
            return 'Unknown step';
    }
}

export default function VerticalStepper() {
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
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" className={classes.root2}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Նախորդը
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Ավարտ' : 'Հաջորդը'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>Բոլոր քայլերն ավարտված են - դուք ավարտեցիք</Typography>
                    <Button onClick={handleReset} className={classes.button2}>
                        Սկսել նորից
                    </Button>
                </Paper>
            )}
        </div>
    );
}

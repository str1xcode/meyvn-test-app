import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './styles.css';

const MIN_STEPS = 2;
const MAX_STEPS = 5;

const Step = ({name, active}) => (
  <div className={cn('Progress-Step', {'Progress-Step_active': active})}>
    <span className='Progress-StepName'>{name}</span>
    <div className='Progress-StepCircle'>
      <div className='Progress-StepInnerCircle'></div>
    </div>
  </div>
)

function validateSteps(steps) {
  if (steps.length < MIN_STEPS) {
    let arr = [];
    arr = arr.concat(steps, Array(MIN_STEPS).fill('empty'));
    arr = arr.slice(0, MIN_STEPS);
    return arr;
  }
  if (steps.length > MAX_STEPS) {
    let arr = [];
    arr = steps.slice(0, MAX_STEPS);
    return arr;
  }
  return steps;
}

class Progress extends Component {
  static defaultProps = {
    steps: ['Design', 'Build', 'Launch']
  };

  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string)
  };

  constructor(props) {
    super();
    this.state = {
      currentStep: 0,
      steps: validateSteps(props.steps),
    };
  }

  componentWillReceiveProps(nextProps) {
    const steps = validateSteps(nextProps.steps)
    const currentStep = this.state.currentStep > steps.length - 1 ? steps.length - 1 : this.state.currentStep;
    this.setState({steps, currentStep});
  }

  nextStep() {
    const { currentStep, steps } = this.state;
    if (currentStep < steps.length - 1) {
      this.setState({currentStep: currentStep + 1});
    }
  }

  prevStep() {
    const { currentStep } = this.state;
    if (currentStep > 0) {
      this.setState({currentStep: currentStep - 1});
    }
  }

  render() {
    const { currentStep, steps } = this.state;
    const percent = currentStep / (steps.length - 1) * 100;

    return (
      <div className='Progress'>
        <div className='Progress-Line'>
          <div className='Progress-InnerLine' style={{width: `${percent}%`}}></div>
        </div>
        <div className='Progress-Steps'>
          {steps.map((name, index) => (
            <Step name={name} key={index} active={index <= currentStep}/>
          ))}
        </div>
      </div>
    );
  }
}

export default Progress;

import React, { Component, Fragment } from 'react';
import Progress from '../../components/Progress';
import './styles.css';

class App extends Component {
  state = {
    steps: ['Design', 'Build', 'Launch']
  }
  render() {
    const { steps } = this.state;
    return (
      <Fragment>
        <Progress
          steps={steps}
          ref={(el) => {this.progress = el}}
        />
        <div className='App-Config'>
          <input placeholder='step name' ref={(el) => this.inputStepName = el}/>
          <button
            onClick={() => {
              const stepName = this.inputStepName.value;
              if (!stepName) return;
              let _steps = steps.slice();
              _steps.push(stepName);
              this.setState({steps: _steps});
              this.inputStepName.value = '';
            }}
          >add new step</button>
          <button onClick={() => {
            let _steps = steps.slice();
            if (_steps.length === 0) return;
            _steps.splice(_steps.length - 1, 1);
            this.setState({steps: _steps});
          }}>remove last step</button>
        </div>
        <div className='App-Actions'>
          <button onClick={() => this.progress.prevStep()}>Prev step</button>
          <button onClick={() => this.progress.nextStep()}>Next step</button>
        </div>
      </Fragment>
    );
  }
}

export default App;

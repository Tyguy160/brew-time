import React, { Component } from "react";
import "./App.css";
import data from "./recipes.json";

// Timer component
class Timer extends Component {
  constructor() {
    super();
    this.startStopTimer = this.startStopTimer.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  state = {
    totalTime: 0, // Total seconds elapsed
    isRunning: false, // Status of timer
    timerId: undefined, // ID used as input to clearInterval()
    time: undefined, // Clock time of timer start
    initialSecs: 0
  };

  formatTime(totalSeconds) {
    // Get seconds place (and milliseconds via toFixed(n))
    const secs = (totalSeconds % 60).toFixed(2);
    // Get minutes place
    const mins = Math.floor(totalSeconds / 60);
    // Format time
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  }

  updateTime() {
    // Grab a new date and time, then get the difference from the old time
    this.setState(prevState => {
      let newDate = new Date();
      let newTime = (newDate.getTime() - prevState.time) / 1000;

      // Update the total time with the difference
      return { totalTime: newTime };
    });
  }

  // Set updateTime to run continuously
  startTimer() {
    this.setState({ timerId: setInterval(this.updateTime, 10) });
    this.setState({ isRunning: true });
  }

  // Set updateTime to stop running
  stopTimer() {
    clearInterval(this.state.timerId);
    this.setState({ isRunning: false });
  }

  // If the timer is not running, reset the time to 0
  resetTimer() {
    if (!this.state.isRunning) {
      this.setState(prevState => {
        return { totalTime: 0 };
      });
    }
  }

  startStopTimer() {
    // If the timer is not running, but has been
    if (!this.state.isRunning && this.state.totalTime !== 0) {
      this.startTimer();
    }
    // If the timer isn't running, but has never
    else if (!this.state.isRunning) {
      // Update the class time variable with the current time
      let startDate = new Date();
      this.setState({ time: startDate.getTime() });

      this.startTimer();
    }
    // Otherwise, stop the timer
    else {
      this.stopTimer();
    }
  }

  render() {
    const { isRunning } = this.state;
    return (
      <div className="timer">
        <div className="timer-display">
          <span className="time">{this.formatTime(this.state.totalTime)}</span>
        </div>
        <div className="controls">
          <button
            className={isRunning ? "stopButton" : "startButton"}
            onClick={this.startStopTimer}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button className="resetButton" onClick={this.resetTimer}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

// Directions component
class Directions extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="directions">
        <h3>Directions</h3>
        <div className="instructions">
          <Step />
          {console.log(data)}
        </div>
      </div>
    );
  }
}

// Step component
class Step extends Component {
  render() {
    return (
      <div className="lineItem">
        <span>Step instructions are here</span>
        <input type="checkbox" />
      </div>
    );
  }
}

// Application
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="nav">
          <h1>Brew Time</h1>
        </header>
        <div className="container">
          <Timer />
          <Directions />
        </div>
      </div>
    );
  }
}

export default App;

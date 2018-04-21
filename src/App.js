import React, { Component } from "react";
import "./App.css";

// Timer component
class Timer extends Component {
  constructor() {
    super();
    this.startStopTimer = this.startStopTimer.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  state = {
    totalTime: 0, // Total seconds elapsed
    isRunning: false, // Status of timer
    timerId: undefined // ID used as input to clearInterval()
  };

  formatTime(totalSeconds) {
    const secs = totalSeconds % 60; // Get seconds place
    const mins = Math.floor(totalSeconds / 60); // Get minutes place
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`; // Format time
  }

  updateTime() {
    // Increment the time by 1
    this.setState(prevState => {
      let newTime = prevState.totalTime + 1;
      return { totalTime: newTime };
    });
  }

  resetTimer() {
    // If the timer is not running, reset the time to 0
    if (!this.state.isRunning) {
      this.setState(prevState => {
        return { totalTime: 0 };
      });
    }
  }

  startStopTimer() {
    // If the timer is not running,
    // start it and update the time every second
    if (!this.state.isRunning) {
      this.setState({ timerId: setInterval(this.updateTime, 1000) });
      this.setState({ isRunning: true });
    } else { // Otherwise, stop the timer
      clearInterval(this.state.timerId);
      this.setState({ isRunning: false });
    }
  }

  render() {
    return (
      <div className="timer">
        <div className="timer-display">
          <span className="time">{this.formatTime(this.state.totalTime)}</span>
        </div>
        <div className="controls">
          <button className="startButton" onClick={this.startStopTimer}>Start</button>
          <button className="resetButton" onClick={this.resetTimer}>Reset</button>
        </div>
      </div>
    );
  }
}

// Directions component
class Directions extends Component {
  render() {
    return (
      <div className="directions">
        <h3>Directions</h3>
        <ul className="instructions">
          <Step />
          <Step />
          <Step />
          <Step />
        </ul>
      </div>
    );
  }
}

// Step component
class Step extends Component {
  render() {
    return (
      <li className="lineItem">
        <span>Step instructions are here</span>
        <input type="checkbox" />
      </li>
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

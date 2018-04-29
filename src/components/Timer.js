import React, { Component } from "react";
import "../App.css";

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
    this.setState(prevState => ({
      isRunning: true
    }));
  }

  // Set updateTime to stop running
  stopTimer() {
    clearInterval(this.state.timerId);
    this.setState(prevState => ({
      isRunning: false
    }));
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
      this.setState(prevState => ({
        time: new Date().getTime() - prevState.totalTime * 1000
      }));
    }
    // If the timer isn't running, but has never
    else if (!this.state.isRunning) {
      // Update the class time variable with the current time
      this.setState({ time: new Date().getTime() });

      this.startTimer();
    }
    // Otherwise, stop the timer
    else {
      this.stopTimer();
    }
  }

  render() {
    const isRunning = this.state.isRunning;
    const inactive = {
      color: "#ABABAB",
      "box-shadow": "none"
    };
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
          <button
            style={isRunning ? inactive : {}}
            className="resetButton"
            onClick={this.resetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
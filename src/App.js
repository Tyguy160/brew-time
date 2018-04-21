import React, { Component } from "react";
import "./App.css";

class Timer extends Component {
  constructor() {
    super();
    this.startStopTimer = this.startStopTimer.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  state = {
    totalTime: 0,
    isRunning: false,
    timerId: undefined
  };

  formatTime(totalSeconds) {
    const secs = totalSeconds % 60;
    const mins = Math.floor(totalSeconds / 60);
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  }

  updateTime() {
    this.setState(prevState => {
      let newTime = prevState.totalTime + 1;
      return { totalTime: newTime };
    });
  }

  resetTimer() {
    if (!this.state.isRunning) {
      this.setState(prevState => {
        return { totalTime: 0 };
      });
    }
  }

  startStopTimer() {
    if (!this.state.isRunning) {
      this.setState({ timerId: setInterval(this.updateTime, 1000) });
      this.setState({ isRunning: true });
    } else {
      clearInterval(this.state.timerId);
      this.setState({ isRunning: false });
    }
  }

  render() {
    return (
      <div>
        <div className="timer-display">
          {this.formatTime(this.state.totalTime)}
        </div>
        <button onClick={this.startStopTimer}>Start/Stop</button>
        <button onClick={this.resetTimer}>Reset</button>
      </div>
    );
  }
}

class Directions extends Component {
  render() {
    return (
      <div>
        <h3>Directions</h3>
        <ul>
          <Step />
          <Step />
        </ul>
      </div>
    );
  }
}

class Step extends Component {
  render() {
    return (
      <li>
        <span>Step instructions are here</span>
        <input type="checkbox" />
      </li>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Triple Bar Coffee</h1>
        </header>
        <Directions />
        <Timer />
      </div>
    );
  }
}

export default App;

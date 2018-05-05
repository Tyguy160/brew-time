import React, { Component } from "react";
import "./styles/App.css";
import Timer from "./components/Timer"
import Directions from "./components/Directions"

// Application
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="nav">
          <h1>Brew Time</h1>
        </header> */}
        <div className="container">
          <Timer />
          <Directions />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "../styles/Step.css";

// Step component
class Step extends Component {

  toggleActive() {
    // if (this.checked) {
    console.log("Hello")
    // }
  }

  render() {
    return (
      <div className="lineItem">
        <span className="instruction-text">{this.props.instruction}</span>
          <input
          type="checkbox"
          className="instruction-checkbox"
          disabled={this.props.status == "incomplete" || this.props.status == "complete"}
          onClick={this.toggleActive}
          />
        {this.props.image}
      </div>
    )
  }
}

export default Step;
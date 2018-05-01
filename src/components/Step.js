import React, { Component } from "react";
import "../styles/Step.css";

// Step component
class Step extends Component {

  render() {
    return (
      <div className="lineItem" key={this.props.key}>
        <span className="instruction-text">{this.props.instruction}</span>
          <input
          type="checkbox"
          className="instruction-checkbox"
          disabled={!this.props.isActive && !this.props.lastComplete}
          onClick={() => this.props.clickHandler(this.props.id)}
          />
        {this.props.image}
      </div>
    )
  }
}

export default Step;
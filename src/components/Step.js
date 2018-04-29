import React, { Component } from "react";
import "../styles/Step.css";

// Step component
class Step extends Component {

  // state = {
  //   isActive: false,
  //   isComplete: false
  // };

  // constructor() {
  //   super();
  //   this.toggleComplete = this.toggleComplete.bind(this);
  // }

  toggleComplete() {
    // console.log(this.props.status)
    // if (this.state.isActive) {
    //   this.setState(prevState => {
    //     console.log(this.props.instruction + ` is complete!`)
    //     return {isActive: false, isComplete: true}
    //   })
    // }
    // else if (this.state.isComplete){
    //   this.setState(prevState => {
    //     console.log(this.props.instruction + ` is NOT complete!`)
    //     return {isActive: true, isComplete: false}
    //   })
    // }
  }

  componentDidMount() {
    // this.setState({
    //   isActive: this.props.status
    // })
  }

  render() {
    return (
      <div className="lineItem">
        <span className="instruction-text">{this.props.instruction}</span>
          <input
          type="checkbox"
          className="instruction-checkbox"
          disabled={!this.props.isActive}
          onClick={this.toggleComplete}
          // checked={this.props.isComplete}
          />
        {this.props.image}
      </div>
    )
  }
}

export default Step;
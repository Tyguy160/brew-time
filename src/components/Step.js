import React, { Component } from "react";
import "../styles/Step.css";

let Image = function generateImage(props) {
  let style = {
    maxWidth: "100%"
  };

  return (
    <img
      alt=""
      className={props.classes.join(" ")}
      src={require("../images/" + props.source)}
      style={style}
    />
  );
};

// Step component
class Step extends Component {

  createImage(image, classes) {
    return <Image source={image} key={image} classes={classes}/>;
  }

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
        {this.createImage(this.props.image,["instruction-image", !this.props.isActive ? "inactive" : ""])}
      </div>
    )
  }
}

export default Step;
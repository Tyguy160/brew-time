import React, { Component } from "react";
import "../styles/Step.css";
import 'pretty-checkbox'
import 'material-design-icons'

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
          <div className="pretty p-default p-round p-pulse">
            <input
            type="checkbox"
            className="instruction-checkbox"
            disabled={!this.props.isActive && !this.props.lastComplete}
            onClick={() => this.props.clickHandler(this.props.id)}
            />
            <div className="state p-success">
              <i className="icon material-icons"></i>
              <label></label>
            </div>
          </div>
        {this.createImage(this.props.image,["instruction-image", !this.props.isActive ? "inactive" : ""])}

      </div>
    )
  }
}

export default Step;
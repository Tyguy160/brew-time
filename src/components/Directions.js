import React, { Component } from "react";
import "../Directions.css";
import data from "../recipes.json";

// Directions component
class Directions extends Component {
  state = {
    recipes: []
  };

  constructor() {
    super();
    this.createImage = this.createImage.bind(this);
  }

  createImage(image) {
    return <Image source={image} key={image} />;
  };

  componentDidMount() {
    let recipesToBeLoaded = data.recipes.map(recipe => {
      const steps = recipe.steps.map(
        (step, i) =>
          i === 0
            ? { instruction: step.step, image: step.image, status: "active" }
            : { instruction: step.step, image: step.image, status: "incomplete" }
      );
      return { name: recipe.name, steps };
    });
    this.setState({ recipes: recipesToBeLoaded });
  }

  render() {
    const recipe = this.state.recipes[0];
    return (
      <div className="directions">
        <h3>{recipe ? recipe.steps.name : "Loading"} Directions</h3>
        <div className="instructions">
          {recipe
            ? recipe.steps.map((step, i) => (
                <Step
                  key={i}
                  instruction={step.instruction}
                  image={this.createImage(step.image)}
                  status={step.status}
                />
              ))
            : "loading"}
        </div>
      </div>
    );
  }
}

// Step component
const Step = props => {

  function toggleActive() {
    // if (this.checked) {
    console.log("Hello")
    // }
  }


  return (
    <div className="lineItem">
      <span className="instruction-text">{props.instruction}</span>
        <input
        type="checkbox"
        className="instruction-checkbox"
        disabled={props.status == "incomplete" || props.status == "complete"}
        onClick={toggleActive}
        />
      {props.image}
    </div>
  );
};

let Image = function generateImage(props) {
  let style = {
    maxWidth: '100%'
  };

  return (
    <img className="instruction-image" src={require('../images/' + props.source)} style={style} />
  );
};

export default Directions;
import React, { Component } from "react";
import "../styles/Directions.css";
import data from "../recipes.json";
import Step from "./Step"

let Image = function generateImage(props) {
  let style = {
    maxWidth: '100%'
  };

  return (
    <img
      className="instruction-image"
      src={require('../images/' + props.source)}
      style={style}
    />
  );
};

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

export default Directions;
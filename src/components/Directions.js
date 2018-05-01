import React, { Component } from "react";
import "../styles/Directions.css";
import data from "../recipes.json";
// import Step from "./Step"

let Image = function generateImage(props) {
  let style = {
    maxWidth: "100%"
  };

  return (
    <img
      alt=""
      className="instruction-image"
      src={require("../images/" + props.source)}
      style={style}
    />
  );
};

// Directions component
class Directions extends Component {
  state = {
    activeRecipe: 0,
    recipes: []
  };

  constructor() {
    super();
    this.createImage = this.createImage.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  createImage(image) {
    return <Image source={image} key={image} />;
  }

  toggleComplete(i) {
    const currState = { ...this.state.recipes };
    const { steps } = currState[this.state.activeRecipe];
    const checking = !!steps[i].isActive;
    const newRecipeState = currState[this.state.activeRecipe].steps.map(
      (step, index) => {
        if (checking) {
          if (index === i) {
            return {
              ...step,
              isActive: false,
              isComplete: true,
              lastComplete: true
            };
          } else if (index === i + 1) {
            return { ...step, isActive: true };
          } else if (index === i - 1) {
            return { ...step, lastComplete: false };
          } else {
            return step;
          }
        } else {
          if (index === i) {
            return {
              ...step,
              isActive: true,
              isComplete: false,
              lastComplete: false
            };
          } else if (index === i + 1) {
            return { ...step, isActive: false };
          } else if (index === i - 1) {
            return { ...step, lastComplete: true };
          } else {
            return step;
          }
        }
      }
    );
    currState[this.state.activeRecipe].steps = newRecipeState;
    this.setState({ recipes: currState });
    // currState;
  }

  componentDidMount() {
    let recipesToBeLoaded = data.recipes.map(recipe => {
      const steps = recipe.steps.map(
        (step, i) =>
          i === 0
            ? {
                instruction: step.step,
                image: step.image,
                isActive: true,
                isComplete: false
              }
            : {
                instruction: step.step,
                image: step.image,
                isActive: false,
                isComplete: false
              }
      );
      return { name: recipe.name, steps };
    });
    this.setState({ recipes: recipesToBeLoaded });
  }

  render() {
    const recipe = this.state.recipes[this.state.activeRecipe];
    return (
      <div className="directions">
        <h3>{recipe ? recipe.steps.name : "Loading"} Directions</h3>
        <div className="instructions">
          {recipe
            ? recipe.steps.map((step, i) => (
                // <Step
                //   key={i}
                //   instruction={step.instruction}
                //   image={this.createImage(step.image)}
                //   isActive={step.isActive}
                //   isComplete={step.isComplete}
                // />
                <div className="lineItem" key={i}>
                  <span className="instruction-text">{step.instruction}</span>
                  <input
                    type="checkbox"
                    className="instruction-checkbox"
                    disabled={!step.isActive && !step.lastComplete}
                    onClick={() => this.toggleComplete(i)}
                    // checked={this.props.isComplete}
                  />
                  {this.createImage(step.image)}
                </div>
              ))
            : "loading"}
        </div>
      </div>
    );
  }
}

export default Directions;

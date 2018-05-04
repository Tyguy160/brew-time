import React, { Component } from "react";
import "../styles/Directions.css";
import data from "../recipes.json";
import Step from "./Step"
import 'simplebar'
import 'simplebar/dist/simplebar.css'

// Directions component
class Directions extends Component {
  state = {
    activeRecipe: 0,
    recipes: []
  };

  constructor() {
    super();
    this.toggleComplete = this.toggleComplete.bind(this);
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
        <div className="instructions" data-simplebar="init">
          {recipe
            ? recipe.steps.map((step, i) => (
                <Step
                  key={i}
                  instruction={step.instruction}
                  image={step.image}
                  isActive={step.isActive}
                  isComplete={step.isComplete}
                  clickHandler={this.toggleComplete}
                  lastComplete={step.lastComplete}
                  id={i}
                />
              ))
            : "loading"}
        </div>
      </div>
    );
  }
}

export default Directions;

import { IRecipe } from "./IRecipe"
import React from 'react';
import ReactDOM from 'react-dom';

const RecipeComponent = (props: {recipe: IRecipe}) =>{
    const{recipe}=props

    return (
        <div className="recipe">
        <div className="title">
           <img src={recipe.image} alt={recipe.title}/> 
           <p>{recipe.title}</p>
        </div>
        </div>
    )

}

export default RecipeComponent
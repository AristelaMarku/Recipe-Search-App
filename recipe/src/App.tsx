import React, { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { IRecipe } from './IRecipe';
import RecipeComponent from './RecipeComponent';
import './App.css';

function App() {

  const[recipeFound, setRecipesFound]=useState<IRecipe[]>([])
  const [recipeSearch,setRecipeSearch] = useState('')
   console.log(recipeFound)

  const searchForRecipes=async(query: String): Promise<IRecipe[]> =>{
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json()).results;
  }

  useEffect(()=>{
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      const response = await searchForRecipes(query);
      setRecipesFound(response);
    })();
  },[recipeSearch])

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement; 
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value)
    // input.value=" "
  }

  return (
    <div className="App">
    <h1 id="title1">Recipe Search App</h1>
    <form className='searchForm' onSubmit={(event)=>search(event)}>
        <input id="searchText" type="text"/>
        <button>Search</button>
    </form>
    {recipeSearch && <p>Results for {recipeSearch}...</p>}
    <div className="recipes-container">
     {recipeFound.length && recipeFound.map((recipe)=>{
        return <RecipeComponent key={recipe.id} recipe={recipe}/>
      })}
    </div>

    </div>
  );
}

export default App;

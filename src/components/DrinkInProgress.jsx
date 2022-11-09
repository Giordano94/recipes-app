import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Context from '../Context/Context';
import { localStorageDoneRecipes, localStorageInProgressRecipes } from '../serviceLocal';

import ButtonFavoriteRecipe from './ButtonFavoriteRecipe';
import ButtonShareRecipe from './ButtonShareRecipe';
import DrinkDetailsHeader from '../images/DrinkDetailsHeader.svg';

import './MealsAndDrick.css';
import './Buttons-favorite-share.css';
import './InProgress.css';

export default function DrinkInProgress() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const [finishDisible, setFinishDisible] = useState(true);
  const [localInProgress, setLocalInProgress] = useState({});

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  const { setApiDrink, setTypeRecipe } = useContext(Context);

  useEffect(() => {
    const requestApi = async () => {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await (await fetch(endPoint)).json();
      setDrinkData(response.drinks[0]);
      setApiDrink(response.drinks[0]);

      const Ingredients = Object.entries(response.drinks[0])
        .filter((e) => e[0].includes('strIngredient') && e[1] !== '' && e[1] !== null)
        .map((e) => e[1]);

      const getLocal = localStorageInProgressRecipes();

      if (!Object.keys(getLocal.drinks).includes(id)) {
        getLocal.drinks[id] = [];
        setLocalInProgress(getLocal);
      }

      setLocalInProgress(getLocal);
      setDrinkIngredients(Ingredients);
      setTypeRecipe('drink');
    };
    requestApi();
  }, [id, setApiDrink, setTypeRecipe]);

  const handleCheckbox = (target, element) => {
    if (target.checked) {
      const newInProgress = { ...localInProgress };

      newInProgress.drinks[id] = [...newInProgress.drinks[id], element];

      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
      setLocalInProgress(newInProgress);
      target.parentNode.className = 'Recipe__label scratched';

      if (newInProgress.drinks[id].length === drinkIngredients.length) {
        setFinishDisible(false);
      } else {
        setFinishDisible(true);
      }
    } else {
      const newInProgress = { ...localInProgress };
      const arrayLocalId = [...newInProgress.drinks[id]];
      const index = arrayLocalId.indexOf(element);

      arrayLocalId.splice(index, 1);
      newInProgress.drinks[id] = arrayLocalId;
      localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgress));
      setLocalInProgress(newInProgress);
      target.parentNode.className = 'Recipe__label';
    }
  };

  const finishRecipe = () => {
    const getLocalDone = localStorageDoneRecipes();
    const dateNow = new Date();

    const recipe = {
      id,
      nationality: drinkData.strArea || '',
      name: drinkData.strDrink,
      category: drinkData.strCategory,
      image: drinkData.strDrinkThumb,
      tags: [],
      alcoholicOrNot: drinkData.strAlcoholic,
      type: 'drink',
      doneDate: dateNow.toISOString(),
    };

    localStorage.setItem('doneRecipes', JSON.stringify([...getLocalDone, recipe]));
    history.push('/done-recipes');
  };

  return (
    <>
      <header className="Recipe-header">
        <nav className="Btns__share__favorite__container">
          <div className="Recipe__category__container">
            <img src={ DrinkDetailsHeader } alt="Drink Details Header" />
            <p data-testid="recipe-category">{drinkData.strCategory}</p>
          </div>
          <div className="Btns__container">
            <ButtonShareRecipe />
            <ButtonFavoriteRecipe />
          </div>
        </nav>
        <img
          src={ drinkData.strDrinkThumb }
          alt={ drinkData.strDrink }
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <h1 data-testid="recipe-title" className="recipe-title">{drinkData.strDrink}</h1>
      </header>
      <main className="Foods-recipe-main">
        <h1 className="recipe-titles">Ingredients</h1>
        <div data-testid="instructions" className="Foods-recipe-ingredient">
          {drinkIngredients.map((e, index) => (
            <label
              htmlFor={ index }
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className={ localInProgress.drinks[id].includes(e)
                ? 'Recipe__label scratched' : 'Recipe__label' }
            >
              <input
                type="checkbox"
                id={ index }
                defaultChecked={ localInProgress.drinks[id].includes(e) || onchange }
                onChange={ ({ target }) => handleCheckbox(target, e) }
              />
              <p className="Recipe__Ingredient__name">{e}</p>
            </label>
          ))}
        </div>
        <h1 className="recipe-titles">Instructions</h1>
        <div className="Foods-recipe-instructions">
          <p data-testid="instructions">
            {drinkData.strInstructions}
          </p>
        </div>
      </main>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ finishDisible }
        onClick={ finishRecipe }
        className="start-recipe-btn"
      >
        finish
      </button>
    </>
  );
}

import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/Context';
import { localStorageDoneRecipes, localStorageInProgressRecipes } from '../serviceLocal';
import ButtonFavoriteRecipe from './ButtonFavoriteRecipe';
import ButtonShareRecipe from './ButtonShareRecipe';
import './InProgress.css';

export default function MealInProgress() {
  const [mealData, setMealData] = useState([]);
  const [mealIngredients, setMealIngredients] = useState([]);
  const [finishDisible, setFinishDisible] = useState(true);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  const getLocal = localStorageInProgressRecipes();

  if (!Object.keys(getLocal.meals).includes(id)) {
    getLocal.meals[id] = [];
  }

  const { setApiMeal, setTypeRecipe } = useContext(Context);

  useEffect(() => {
    const requestApi = async () => {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await (await fetch(endPoint)).json();
      setMealData(response.meals[0]);
      setApiMeal(response.meals[0]);

      const Ingredients = Object.entries(response.meals[0])
        .filter((e) => e[0].includes('strIngredient') && e[1] !== '' && e[1] !== null)
        .map((e) => e[1]);

      setTypeRecipe('meal');
      setMealIngredients(Ingredients);
    };
    requestApi();
  }, [id, setApiMeal, setTypeRecipe]);

  const handleCheckbox = (target, element) => {
    if (target.checked) {
      target.parentNode.className = 'scratched';
      getLocal.meals[id] = [...getLocal.meals[id], element];
      localStorage.setItem('inProgressRecipes', JSON.stringify(getLocal));
      if (JSON.stringify(getLocal.meals[id]) === JSON.stringify(mealIngredients)) {
        setFinishDisible(false);
      } else {
        setFinishDisible(true);
      }
    } else {
      target.parentNode.className = '';
      const arrayLocalId = [...getLocal.meals[id]];
      const index = arrayLocalId.indexOf(element);
      arrayLocalId.splice(index, 1);
      getLocal.meals[id] = arrayLocalId;
      localStorage.setItem('inProgressRecipes', JSON.stringify(getLocal));
    }
  };

  const finishRecipe = () => {
    const getLocalDone = localStorageDoneRecipes();
    const dateNow = new Date();

    const recipe = {
      id,
      nationality: mealData.strArea,
      name: mealData.strMeal,
      category: mealData.strCategory,
      image: mealData.strMealThumb,
      tags: mealData.strTags.split(','),
      alcoholicOrNot: '',
      type: 'meal',
      doneDate: dateNow.toISOString(),
    };

    localStorage.setItem('doneRecipes', JSON.stringify([...getLocalDone, recipe]));
    history.push('/done-recipes');
  };

  return (
    <main>
      <img
        src={ mealData.strMealThumb }
        alt={ mealData.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{mealData.strMeal}</h1>
      <p data-testid="recipe-category">{mealData.strCategory}</p>
      <ButtonShareRecipe />
      <ButtonFavoriteRecipe />
      <div data-testid="instructions">
        {mealIngredients.map((e, index) => (
          <label
            htmlFor={ e }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={ getLocal.meals[id].includes(e) ? 'scratched' : '' }
          >
            <input
              type="checkbox"
              id={ e }
              checked={ getLocal.meals[id].includes(e) || onchange }
              onClick={ ({ target }) => handleCheckbox(target, e) }
            />
            <p>{e}</p>
          </label>
        ))}
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ finishDisible }
        onClick={ finishRecipe }
      >
        finish
      </button>
    </main>
  );
}

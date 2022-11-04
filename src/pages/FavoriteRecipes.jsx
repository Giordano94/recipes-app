import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeart from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';

import All from './images/All.svg';
import foods from './images/foods.svg';
import drinksIcon from './images/drinks.svg';
import Share from '../images/Share.svg';

const clip = require('clipboard-copy');

export default function FavoriteRecipes() {
  const [favs, setFavs] = useState([]);
  const [favs2, setFavs2] = useState([]);
  const [text, setText] = useState(false);
  useEffect(() => {
    const us = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavs(us);
    setFavs2(us);
  }, []);
  const handleClip = (id, type) => {
    const index1 = window.location.href.indexOf('done-recipes');
    const location = window.location.href.substring(0, index1 - 1);
    clip(`${location}/${type}s/${id}`);
    setText(true);
  };
  const handleFavs = (elem) => {
    const newFavs = favs.filter((e) => e !== elem);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavs));
    setFavs(newFavs);
    setFavs2(newFavs);
  };
  const drinkFilter = () => {
    const drinks = favs2.filter((e) => e.type.includes('drink'));
    setFavs(drinks);
  };
  const mealFilter = () => {
    const meals = favs2.filter((e) => e.type.includes('meal'));
    setFavs(meals);
  };
  const allFilter = () => {
    setFavs(favs2);
  };
  return (
    <>
      <Header />
      { text && (<p data-testid="link-copied">Link copied!</p>)}
      <div className="Done__buttons__container">
        <div className="Done__label">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => allFilter() }
            className="Recipes__buttons"
          >
            <img src={ All } alt="all" />
          </button>
          <p>All</p>
        </div>
        <div className="Done__label">
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => mealFilter() }
            className="Recipes__buttons"
          >
            <img src={ foods } alt="foods" />
          </button>
          <p>Food</p>
        </div>
        <div className="Done__label">
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => drinkFilter() }
            className="Recipes__buttons"
          >
            <img src={ drinksIcon } alt="drinks" />
          </button>
          <p>Drinks</p>
        </div>
      </div>
      <div className="Card__Done__container">
        {favs?.map((element, i) => (
          element.type.includes('meal')
            ? (
              <div key={ i } className="Receipe__Card__container">
                <Link to={ `/meals/${element.id}` }>
                  <img
                    src={ element.image }
                    alt={ element.name }
                    data-testid={ `${i}-horizontal-image` }
                    className="Recipe__horizontal__img"
                  />
                </Link>
                <div className="Card__container1">
                  <Link to={ `/meals/${element.id}` } className="Recipe__card__name">
                    <h2 data-testid={ `${i}-horizontal-name` }>{element.name}</h2>
                    <p
                      data-testid={ `${i}-horizontal-top-text` }
                      className="Card__top__text"
                    >
                      {`${element.nationality} - ${element.category}`}
                    </p>
                  </Link>
                  <div>
                    <button
                      id={ element.id }
                      type="button"
                      data-testid={ `${i}-horizontal-share-btn` }
                      src={ share }
                      onClick={ () => handleClip(element.id, element.type) }
                      className="Card__btn__share"
                    >
                      <img src={ Share } alt="Share" />
                    </button>
                    <button
                      type="button"
                      data-testid={ `${i}-horizontal-favorite-btn` }
                      src={ blackHeart }
                      onClick={ () => handleFavs(element) }
                      className="Card__btn__share"
                    >
                      <img src={ blackHeart } alt="blackHeart" />
                    </button>
                  </div>
                </div>
              </div>
            )
            : (
              <div key={ i } className="Receipe__Card__container">
                <Link
                  key={ i }
                  to={ `/drinks/${element.id}` }
                >
                  <img
                    src={ element.image }
                    alt={ element.name }
                    data-testid={ `${i}-horizontal-image` }
                    className="Recipe__horizontal__img"
                  />
                </Link>
                <div className="Card__container1">
                  <Link
                    key={ i }
                    to={ `/drinks/${element.id}` }
                    className="Recipe__card__name"
                  >
                    <h2 data-testid={ `${i}-horizontal-name` }>{element.name}</h2>
                    <p
                      data-testid={ `${i}-horizontal-top-text` }
                      className="Card__top__text"
                    >
                      {element.alcoholicOrNot}
                    </p>
                  </Link>
                  <div>
                    <button
                      type="button"
                      data-testid={ `${i}-horizontal-share-btn` }
                      src={ share }
                      onClick={ () => handleClip(element.id, element.type) }
                      className="Card__btn__share"
                    >
                      <img src={ Share } alt="Share" />
                    </button>
                    <button
                      type="button"
                      data-testid={ `${i}-horizontal-favorite-btn` }
                      src={ blackHeart }
                      onClick={ () => handleFavs(element) }
                      className="Card__btn__share"
                    >
                      <img src={ blackHeart } alt="blackHeart" />
                    </button>
                  </div>
                </div>
              </div>
            )
        )) }
      </div>
    </>
  );
}

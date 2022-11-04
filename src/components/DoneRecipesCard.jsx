import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

import './DoneRecipesCard.css';
import Share from '../images/Share.svg';

const clip = require('clipboard-copy');

export default function DoneRecipesCard(props) {
  const { doneRecipe, index } = props;
  const [copyLink, setCopyLink] = useState(false);

  const copyUrl = (param) => {
    clip(`http://localhost:3000/${param.type}s/${param.id}`);
    setCopyLink(true);
  };
  return (
    <div>
      {doneRecipe.type === 'meal' ? (
        <div key={ doneRecipe.id } className="Receipe__Card__container">
          { copyLink && (<p>Link copied!</p>)}
          <Link key={ index } to={ `/meals/${doneRecipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ doneRecipe.image }
              alt={ doneRecipe.name }
              className="Recipe__horizontal__img"
            />
          </Link>
          <div className="Card__container1">
            <div className="Card__name__share">
              <Link
                key={ index }
                to={ `/meals/${doneRecipe.id}` }
                className="Recipe__card__name"
              >
                <h2 data-testid={ `${index}-horizontal-name` }>{doneRecipe.name}</h2>
              </Link>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                type="button"
                onClick={ () => copyUrl(doneRecipe) }
                className="Card__btn__share"
              >
                <img src={ Share } alt="Share" />
              </button>
            </div>
            <p data-testid={ `${index}-horizontal-top-text` } className="Card__top__text">
              {`${doneRecipe.nationality} - ${doneRecipe.category}`}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` } className="Card__date">
              {doneRecipe.doneDate}
            </p>
            <div className="Card__tags__container">
              {doneRecipe.tags.map((tag, i) => (
                <p key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div key={ doneRecipe.id } className="Receipe__Card__container">
          { copyLink && (<p>Link copied!</p>)}
          <Link key={ index } to={ `/drinks/${doneRecipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ doneRecipe.image }
              alt={ doneRecipe.name }
              className="Recipe__horizontal__img"
            />
          </Link>
          <div className="Card__container1">
            <div className="Card__name__share">
              <Link
                key={ index }
                to={ `/drinks/${doneRecipe.id}` }
                className="Recipe__card__name"
              >
                <h2 data-testid={ `${index}-horizontal-name` }>{doneRecipe.name}</h2>
              </Link>
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                type="button"
                onClick={ () => copyUrl(doneRecipe) }
                className="Card__btn__share"
              >
                <img src={ Share } alt="Share" />
              </button>
            </div>
            <p data-testid={ `${index}-horizontal-top-text` } className="Card__top__text">
              {doneRecipe.alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` } className="Card__date">
              {doneRecipe.doneDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

DoneRecipesCard.propTypes = {
  doneRecipe: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  index: PropTypes.number.isRequired,
};

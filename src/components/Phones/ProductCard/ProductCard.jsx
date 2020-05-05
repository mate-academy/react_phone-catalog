import React, { useState } from 'react';
import './ProductCard.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import favoriteIcon from '../../../assets/images/icons/favorite-icon.svg';
// eslint-disable-next-line max-len
import favoriteIconActive from '../../../assets/images/icons/favorite-icon--active.svg';

export const ProductCard = (props) => {
  const {
    imageUrl,
    name,
    id,
    snippet,
    addToCart,
    addToFavorites,
    itemPrice,
  } = props;

  const [inCart, setInCart] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleClick = (phoneId) => {
    addToCart(phoneId);
    setInCart({ inCart: !inCart });
  };

  const handleFavoriteClick = (phoneId) => {
    addToFavorites(phoneId);
    setFavorite({ favorite: !favorite });
  };

  return (
    <>
      <div className="card">
        <img
          src={imageUrl}
          alt="/"
          className="card__product-img"
        />
        <NavLink
          to={`/phones/${id}`}
          className="card__link"
        >
          {name}
        </NavLink>
        <p className="card__price">
          <span className="card__price-new">{`$${itemPrice}`}</span>
          <span className="card__price-old">$299</span>
        </p>
        <div className="card__product-details">
          <p className="card__snippet">{snippet}</p>
        </div>
        <div className="card__buttons">
          {inCart ? (
            <button
              className="card__add-to-cart card__add-to-cart--added"
              type="button"
            >
              Added to cart
            </button>
          ) : (
            <button
              className="card__add-to-cart"
              type="button"
              onClick={() => handleClick(id)}
            >
              Add to cart
            </button>
          )}
          {favorite ? (
            <button
              className="card__favorite"
              type="button"
            >
              <img
                src={favoriteIconActive}
                alt="favorite icon"
                className="card__favorite-icon"
              />
              {' '}
            </button>
          ) : (
            <button
              className="card__favorite"
              type="button"
              onClick={() => handleFavoriteClick(id)}
            >
              <img
                src={favoriteIcon}
                alt="favorite icon"
                className="card__favorite-icon"
              />
              {' '}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  snippet: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  itemPrice: PropTypes.number.isRequired,
};

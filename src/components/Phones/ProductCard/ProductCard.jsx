import React from 'react';
import './ProductCard.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import favoriteIcon from '../../../assets/images/icons/favorite-icon.svg';

export const ProductCard = (props) => {
  const { imageUrl, name, id, snippet, addToCart } = props;
  const handleClick = (phoneId) => {
    addToCart(phoneId);
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
          <span className="card__price-new">$799</span>
          <span className="card__price-old">$899</span>
        </p>
        <div className="card__product-details">
          <p className="card__snippet">{snippet}</p>
        </div>
        <div className="card__buttons">
          <button
            className="card__add-to-cart"
            type="button"
            onClick={() => handleClick(id)}
          >
            Add to cart
          </button>
          <button className="card__favorite" type="button">
            <img
              src={favoriteIcon}
              alt="favorite icon"
              className="card__favorite-icon"
            />
            {' '}
          </button>
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
};

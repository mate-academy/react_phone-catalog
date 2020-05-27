import React from 'react';
import { NavLink } from 'react-router-dom';

import './ProductCard.scss';

export const ProductCard: React.FC = () => {
  return (
    <div className="card">
      <NavLink
        to="#"
        exact
      >
        <img
          src="./img/image 2.jpg"
          alt="phone_image"
          className="card__image"
        />
      </NavLink>
      <NavLink
        to="/"
        className="card__heading"
        exact
      >
        Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
      </NavLink>
      <div>
        <span className="card__price price-discount">$375</span>
        <span className="card__price price-regular">$500</span>
      </div>
      <div className="card__details">
        <div className="card__detail">
          <span className="card__detail-name">Screen</span>
          <span className="card__detail-value">4.7 IPS</span>
        </div>
        <div className="card__detail">
          <span className="card__detail-name">Capacity</span>
          <span className="card__detail-value">64 GB</span>
        </div>
        <div className="card__detail">
          <span className="card__detail-name">Ram</span>
          <span className="card__detail-value">4 GB</span>
        </div>
      </div>
      <div className="card__actions">
        <button
          type="button"
          className="card__button-cart"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="card__button-favourite"
        >
          <img src="./img/favorites-icon.svg" alt="add to favorites" />
        </button>
      </div>
    </div>
  );
};

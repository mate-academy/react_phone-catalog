/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import './Card.scss';

type Props = { good: Good };

export const Card: React.FC<Props> = ({ good }) => {
  const {
    id, name, imageUrl, price, discount, screen, capacity, ram,
  } = good;


  return (
    <li
      className="Card__item"
      key={id}
    >
      <div>
        <img
          src={`./${imageUrl}`}
          alt={name}
          className="Card__img"
        />

        <h3 className="Card__title">{name}</h3>
        <div className="price__wrapper">
          <span className="Card__discount">
            {' '}
            $
            {`${price - ((price * discount) / 100)}`}
          </span>
          <span className="Card__price">
            {' '}
            $
            {price}
          </span>
        </div>
        <ul className="Card__parameters">
          <li className="parameters__item">
            <p>screen:</p>
            <p className="parameters__value">{screen}</p>
          </li>
          <li className="parameters__item">
            <p>capacity:</p>
            <p className="parameters__value">{capacity}</p>
          </li>
          <li className="parameters__item">
            <p>ram:</p>
            <p className="parameters__value">{ram}</p>
          </li>
        </ul>
      </div>
      <div className="cartFavorites__wrapper">
        <button
          type="button"
          className="btn__addToCart btn__addToCart-link"
        >
          Add to cart
        </button>
        <button type="button" className="btn__Favorites-link" />
      </div>
    </li>
  );
};

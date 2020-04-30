import React from 'react';
import './CartItem.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const CartItem = (props) => {
  const { age, id, imageUrl, name, itemPrice } = props;

  return (
    <div className="cartItem">
      <input className="cartItem__delete" type="checkbox" />
      <img src={imageUrl} alt="phone" className="cartItem__image" />
      <NavLink to={`/phones/${id}`} className="cartItem__name">{name}</NavLink>
      <div className="cartItem__change-price-box">
        <button
          className="cartItem__button cartItem__button--min"
          type="button"
        >
          -
        </button>
        <span className="cartItem__item-count">1</span>
        <button
          className="cartItem__button cartItem__button--plus"
          type="button"
        >
          +
        </button>
        <span className="cartItem__itemsPrice">{`$${itemPrice}`}</span>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  itemPrice: PropTypes.number.isRequired,
};

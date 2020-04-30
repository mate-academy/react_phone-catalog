import React from 'react';
import './CartItem.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import removeIcon from '../../assets/images/icons/remove-icon.svg';

export const CartItem = (props) => {
  const {
    id,
    imageUrl,
    name,
    removePhone,
    quantity,
    addQuantity,
    substractQuantity,
    price,
  } = props;

  const handleRemove = (phoneId) => {
    removePhone(phoneId);
  };

  const handleAddQuantity = (phoneId) => {
    addQuantity(phoneId);
  };

  const handleSubstractQuantity = (phoneId) => {
    substractQuantity(phoneId);
  };

  return (
    <div className="cartItem">
      <button
        className="cartItem__delete"
        type="button"
        onClick={() => handleRemove(id)}
      >
        <img
          src={removeIcon}
          alt="delete icon"
          className="cartItem__delete-icon"
        />
      </button>
      <img src={imageUrl} alt="phone" className="cartItem__image" />
      <NavLink to={`/phones/${id}`} className="cartItem__name">{name}</NavLink>
      <div className="cartItem__change-price-box">
        <button
          className="cartItem__button cartItem__button--min"
          type="button"
          onClick={() => handleSubstractQuantity(id)}
        >
          -
        </button>
        <span className="cartItem__item-count">{quantity}</span>
        <button
          className="cartItem__button cartItem__button--plus"
          type="button"
          onClick={() => handleAddQuantity(id)}
        >
          +
        </button>
        <span className="cartItem__itemsPrice">{`$${price}`}</span>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  removePhone: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  addQuantity: PropTypes.func.isRequired,
  substractQuantity: PropTypes.func.isRequired,
};

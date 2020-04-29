import React from 'react';
import './Cart.scss';
import PropTypes from 'prop-types';

export const CartItem = (props) => {
  const { age, id, imageUrl, name } = props;

  return (
    <div>
      <span className="cartItem__id">{`ID: ${age}`}</span>
      <img src={imageUrl} alt="phone" className="cartItem__image" />
      <span className="cartItem__name">{name}</span>
      <span className="cartItem__name">{id}</span>
    </div>
  );
};

CartItem.propTypes = {
  age: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

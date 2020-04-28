import React from 'react';
import './Cart.scss';
import PropTypes from 'prop-types';
import { CartItem } from './CartItem';

export const Cart = (props) => {
  const { addedPhones } = props;
  const price = 799;
  const totalPrice = addedPhones.length * price;

  return (
    <div className="cart">
      <h1 className="cart__heading">Cart</h1>
      <div className="cart__content">
        <ul className="cart__list">
          {addedPhones.map(phone => (
            <li
              className="cart__item"
              key={phone.id}
            >
              <CartItem {...phone} />
            </li>
          ))}
        </ul>
        <div className="cart__totalCount">{totalPrice}</div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  addedPhones: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.number,
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      snippet: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

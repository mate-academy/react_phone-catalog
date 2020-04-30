import React from 'react';
import './Cart.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { CartItem } from './CartItem';
import backArrow from '../../assets/images/icons/back-arrow.svg';

export const Cart = (props) => {
  const { addedPhones, totalPrice, itemPrice } = props;

  return (
    <div className="cart">
      <div className="cart__navigation">
        <NavLink to="/phones/" className="cart__back-link">
          <img
            src={backArrow}
            alt="back arrow navigation"
            className="cart__back-arrow"
          />
          <span className="cart__back-link">Back</span>
        </NavLink>
      </div>

      <h1 className="cart__heading">Cart</h1>
      <div className="cart__content">
        {addedPhones.length
          ? (
            <ul className="cart__list">
              {addedPhones.map(phone => (
                <li
                  className="cart__item"
                  key={phone.id}
                >
                  <CartItem
                    {...phone}
                    itemPrice={itemPrice}
                  />
                </li>
              ))}
            </ul>
          )
          : null
        }
        <div className="cart__totalCount total">
          <h1 className="total__price">{`$${totalPrice}`}</h1>
          <p className="total__item-count">
            {`Total for ${addedPhones.length} items`}
          </p>
          <div className="total__button-container">
            <button className="total__button" type="button">Checkout</button>
          </div>
        </div>
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
  totalPrice: PropTypes.number.isRequired,
  itemPrice: PropTypes.number.isRequired,
};

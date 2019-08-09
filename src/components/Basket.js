import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Basket = ({
  selectedPhones,
  removePhone,
  decreaseQuantity,
  increaseQuantity,
}) => (
  <div>
    <h1 className="basket-title">Added items</h1>

    {selectedPhones.length < 1
      ? <p className="basket-text">Shopping Cart is empty</p>
      : (
        <ul className="shopping-list">
          {selectedPhones.map(phone => (
            <li className="phone-card">
              <Link to={`/phones/${phone.id}`}>
                <img
                  src={phone.image}
                  alt="phone"
                  className="shopping-list__img"
                />
              </Link>

              <Link
                to={`/phones/${phone.id}`}
                className="shopping-list__item-link"
              >
                {phone.id}
              </Link>

              <button
                type="button"
                name="-"
                className="cart-btn minus-btn"
                onClick={() => decreaseQuantity(phone.id)}
              >
                -
              </button>

              <div className="shopping-list__quantity">
                {`${phone.quantity}
                  ${phone.quantity > 1 ? 'items' : 'item'}
                `}
              </div>

              <button
                type="button"
                name="+"
                className="cart-btn plus-btn"
                onClick={() => increaseQuantity(phone.id)}
              >
                +
              </button>

              <button
                type="button"
                className="cart-btn remove-btn"
                onClick={() => removePhone(phone.id)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )
    }
  </div>
);

Basket.propTypes = {
  selectedPhones: PropTypes.arrayOf(PropTypes.object).isRequired,
  removePhone: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default Basket;

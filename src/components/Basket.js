import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Basket = ({
  selectedPhones,
  removePhone,
  decreaseQuantity,
  increaseQuantity,
}) => (
  <div className="basket-page">
    {selectedPhones.length < 1
      ? (
        <div className="basket-page__empty-basket">
          <h1 className="basket-page__empty-basket-title">
            Shopping Cart is empty
          </h1>
          <img
            className="basket-page__empty-basket-img"
            src="img/empty-basket.png"
            alt="empty basket"
          />
        </div>
      ) : (
        <div className="basket-page__wrapper">
          <h1 className="basket-page__title">Added items</h1>
          <ul className="basket-page__shopping-list">
            {selectedPhones.map(phone => (
              <li
                key={phone.id}
              >
                <Link to={`/details/${phone.id}`}>
                  <img
                    src={phone.image}
                    alt="phone"
                    className="basket-page__shopping-list-img"
                  />
                </Link>

                <Link
                  to={`/details/${phone.id}`}
                  className="basket-page__shopping-list-item-link"
                >
                  {phone.id}
                </Link>

                <div className="basket-page__change-quantity-btns">
                  <button
                    type="button"
                    name="-"
                    className="
                    cart-btn
                    basket-page__change-quantity-btns-btn
                    quantity-btn
                    "
                    onClick={() => decreaseQuantity(phone.id)}
                  >
                    -
                  </button>

                  <div className="basket-page__shopping-list-quantity">
                    {`${phone.quantity}
                      ${phone.quantity > 1 ? 'items' : 'item'}
                    `}
                  </div>

                  <button
                    type="button"
                    name="+"
                    className="
                    cart-btn
                    basket-page__change-quantity-btns-btn
                    quantity-btn
                    "
                    onClick={() => increaseQuantity(phone.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="
                  cart-btn
                  basket-page__shopping-list-remove-btn
                  "
                  onClick={() => removePhone(phone.id)}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>
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

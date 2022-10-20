/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import { ProductsContext } from '../../helpers/ProductsContext';

import './Cart.scss';

export const CartPage: React.FC = () => {
  const { cartItems } = useContext(ProductsContext);

  return (
    <div className="category-page cart">

      <div
        className="category-page__back"
        onClick={() => window.history.back()}
      >
        <img
          src="img/icons/prev-arrow.svg"
          alt="back-arrow"
        />

        <p className="status__title">Back</p>
      </div>

      <div className="section__title section__title--is-cart">
        Cart
      </div>

      <div className="cart__list--container">
        <ul className="cart__list">
          {cartItems.map(item => (
            <li className="cart__item">
              <div className="cart__item--close-icon" />

              <div className="cart__image--container">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="cart__image"
                />
              </div>

              <div className="cart__title">
                {item.name}
              </div>

              <div className="cart__buttons buttons">
                <button
                  type="button"
                  className="buttons__button"
                >
                  <img
                    src="img/icons/minus.svg"
                    alt="minus"
                  />
                </button>

                <div className="cart__quantity">
                  1
                </div>

                <button
                  type="button"
                  className="buttons__button"
                >
                  <img
                    src="img/icons/plus.svg"
                    alt="minus"
                  />
                </button>
              </div>

              <div className="cart__price">
                {`$${item.price}`}
              </div>
            </li>
          ))}
        </ul>

        <div className="cart__checkout-block checkout-block">
          <div className="checkout-block__total-price">
            {cartItems.reduce((accum, current) => accum + current.price, 0)}
          </div>
        </div>
      </div>

    </div>
  );
};

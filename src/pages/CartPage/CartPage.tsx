import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './CartPage.scss';
import { ProductsContext } from '../../components/ProductsContext';
import { NoResult } from '../../components/NoResult';
import { CartList } from '../../components/CartList';
import { CartTotalBar } from '../../components/CartTotalBar';

export const CartPage: React.FC = () => {
  const { carts } = useContext(ProductsContext);
  const [isMessage, setIsMessage] = useState(false);

  const totalPrice = carts.reduce(
    (accumulator, currentItem) => (
      accumulator + currentItem.price * currentItem.quantity
    ), 0,
  );

  const totalItems = carts.reduce(
    (accumulator, currentItem) => (
      accumulator + currentItem.quantity
    ), 0,
  );

  return (
    <div className="main__cart cart">
      <div className="container">
        <div className="cart__content">
          <div className="cart__header">
            <NavLink
              className="cart__link"
              to="/"
            >
              <div
                className="
                  icon
                  icon__arrow-primary
                "
              />

              Back
            </NavLink>

            <h1 className="cart__title">
              Cart
            </h1>

          </div>
          {
            carts.length ? (
              <div className="cart__wrapper">
                <div className="cart__list">
                  <CartList
                    products={carts}
                    data-cy="productList"
                  />
                </div>

                <div className="cart__total-bar">
                  <CartTotalBar
                    totalPrice={totalPrice}
                    totalItems={totalItems}
                    showMessage={setIsMessage}
                  />
                </div>

                <p className={classNames(
                  'cart__not-implement-message',
                  {
                    'cart__not-implement-message--active': isMessage,
                  },
                )}
                >
                  We are sorry, but this feature is not implemented yet
                </p>
              </div>
            ) : (
              <NoResult message="Your cart is empty" />
            )
          }
        </div>
      </div>
    </div>
  );
};

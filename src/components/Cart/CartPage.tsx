import React, { useContext, useEffect } from 'react';
import { CartContext } from './CartContext';
import { CartItem } from './CartItem';
import './Cart.scss';

export const CartPage = () => {
  const {
    productInCart,
    totalQuantity,
    setTotalQuantity,
    totalCost,
    setTotalCost,
  } = useContext(CartContext);

  useEffect(() => {
    setTotalQuantity(productInCart.length);
    setTotalCost(productInCart.reduce((prev, item) => {
      return prev + (item.price - item.price * (item.discount / 100));
    }, 0));
  }, []);

  return (
    <>
      <div className="productInCart container">
        <div>
          <h1 className="products__title">Cart</h1>
        </div>
        <div className="cart">
          <ul className="cart__list">
            {productInCart.map((item) => (
              <li
                className="list__cartItem"
                key={item.id}
              >
                <CartItem item={item} />
              </li>
            ))}
          </ul>
          <div className="cart__checkout checkout">
            <h1 className="checkout__header">
              $
              {totalCost}
            </h1>
            <p className="checkout__text">
              Total for
              {' '}
              {totalQuantity}
              {' '}
              items
            </p>
            <span className="checkout__decor" />
            <button
              type="button"
              className="checkout__button button__cart"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

// <div className="cart-page__buy-block buy-block">
// <p className="buy-block__price">
//   $
//   {totalCost}
// </p>
// <p className="buy-block__count">
//   Total for
//   {' '}
//   {totalCount}
//   {' '}
//   items
// </p>

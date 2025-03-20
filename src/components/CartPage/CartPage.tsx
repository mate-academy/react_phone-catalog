import React, { useContext } from 'react';
import './CartPage.scss';
import { BackButton } from '../ButtonBack';
import { CartItem } from '../CartItem';
import { ProductsContext } from '../context/ProductsContext';

export const CartPage = () => {
  const { cartProducts } = useContext(ProductsContext);

  const totalCartProducts = cartProducts.reduce(
    (acc, { product: { price } }) => acc + price,
    0,
  );

  return (
    <div className="cart">
      <div className="container container--with-paddings">
        <BackButton />
        <h1 className="cart__title">Cart</h1>
        <div className="cart__content">
          <ul className="cart__list">
            {cartProducts.map(cartProduct => (
              <li className="cart__list__item" key={cartProduct.id}>
                <CartItem cartProduct={cartProduct.product} />
              </li>
            ))}
          </ul>
          {Boolean(cartProducts.length) ? (
            <div className="cart__total">
              <p className="cart__total__count">{`$ ${totalCartProducts}`}</p>
              <span className="cart__total__count-of-items">
                {`Total for ${cartProducts.length} items`}
              </span>
              <button className="cart__total__button">Checkout</button>
            </div>
          ) : (
            <div className="cart__empty">
              <img
                src="../../../public/img/cart-is-empty.png"
                alt="your cart is empty"
                className="cart__empty__img"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

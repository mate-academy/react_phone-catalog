/* eslint-disable max-len */

import './CartPage.scss';
import { type ComponentProps } from 'react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem/CartItem';
import productsFromServer from '../../../public/api/products.json';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { cart, clearCart } = useCart();

  const products = productsFromServer.filter(product =>
    cart.some(item => item.id === product.itemId),
  );

  const totalAmount = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = products.reduce((total, product) => {
    const cartItem = cart.find(item => item.id === product.itemId);

    return total + product.price * (cartItem?.quantity ?? 1);
  }, 0);

  const handleCheckout = () => {
    if (confirm('Do you want to clear the Cart?')) {
      clearCart();
    }
  };

  const navigate = useNavigate();

  return (
    <main className="cart-main">
      <div className="cart__content-back">
        <div className="cart__content-back-block">
          <svg
            className="cart__content-back__icon"
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              d="M5.13872 0.195262C4.87837 -0.0650874 4.45626 -0.0650874 4.19591 0.195262L0.195913 4.19526C-0.0644364 4.45561 -0.0644364 4.87772 0.195913 5.13807L4.19591 9.13807C4.45626 9.39842 4.87837 9.39842 5.13872 9.13807C5.39907 8.87772 5.39907 8.45561 5.13872 8.19526L1.61013 4.66667L5.13872 1.13807C5.39907 0.877722 5.39907 0.455612 5.13872 0.195262Z"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#F1F2F9"
            />
          </svg>
          <span
            className="cart__content-back__button"
            onClick={() => navigate(-1)}
          >
            Back
          </span>
        </div>
      </div>
      <h1 className="cart__content-main__title">Cart</h1>
      <div className="cart__content">
        {cart.length === 0 ? (
          <p className="cart__content__empty">Your cart is empty</p>
        ) : (
          <>
            <section className="cart__content-cards">
              {products.map(product => (
                <CartItem
                  key={product.itemId}
                  product={
                    product as unknown as ComponentProps<
                      typeof CartItem
                    >['product']
                  }
                />
              ))}
            </section>
            <section className="cart__content-checkout">
              <div className="cart__content-checkout--total-amount">
                {`$${totalPrice}`}
              </div>
              <div className="cart__content-checkout--total-items">
                {`Total for ${totalAmount} items`}
              </div>
              <span className="cart__content-checkout--line"></span>
              <button
                className="cart__content-checkout--button"
                onClick={() => handleCheckout()}
              >
                Checkout
              </button>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItemType } from '../../types/CartItemType';
import { CartItem } from '../../components/CartItem';
import { useCartContext } from '../../context/CartContext';
import './CartPage.scss';

const BASE = import.meta.env.BASE_URL;

export const CartPage: React.FC = () => {
  const { cartItems, total } = useCartContext();
  const navigate = useNavigate();

  return (
    <section className="cart-page">
      <div className="container">
        <button className="product-details__back" onClick={() => navigate(-1)}>
          <img src={`${BASE}img/icons/left.svg`} alt="Back" />
          Back
        </button>
        <h1 className="cart-page__title">Cart</h1>

        <div className="cart-page__content">
          <ul className="cart-page__list">
            {cartItems.map((item: CartItemType) => (
              <li key={item.id} className="cart-page__item">
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <aside className="cart-summary">
            <div className="cart-summary__price">${total}</div>

            <div className="cart-summary__items">
              Total for {cartItems.length} items
            </div>

            <div className="cart-summary__divider" />

            <button className="cart-summary__button">Checkout</button>
          </aside>
        </div>
      </div>
    </section>
  );
};

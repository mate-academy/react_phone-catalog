import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.scss';
import React from 'react';
import { CartItem } from '../../components/CartItem/CartItem';
import { useCartDispatch, useCartState } from '../../contexts/CartContext';

export const Cart = () => {
  const { cart, totalPrice, cartCount } = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  return (
    <section className={styles.cart}>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.cart__back}
          onClick={() => navigate('..')}
        >
          Back
        </button>
        <h1 className={styles.cart__title}>Cart</h1>

        {cart.length > 0 ? (
          <div className={styles.cart__content}>
            <ul className={styles.cart__list}>
              {cart.map(item => (
                <li key={item.product.id} className={styles.cart__item}>
                  <CartItem cartItem={item} />
                </li>
              ))}
            </ul>

            <div className={styles.cart__priceBlock}>
              <span className={styles.cart__totalPrice}>${totalPrice}</span>
              <p className={styles.cart__text}>Total for {cartCount} items</p>
              <button className={styles.cart__btn} onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.cart__empty}>Your cart is empty.</p>
        )}
      </div>
    </section>
  );
};

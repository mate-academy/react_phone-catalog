import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  return (
    <div className={styles.cartPage}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src="/img/Back.svg" alt="back" />
        Back
      </button>

      <h1 className={styles.cartPage__title}>Cart</h1>

      <div className={styles.cartPage__content}>
        <div className={styles.cartPage__itemsList}>
          {cart.map(item => (
            <div key={item.id} className={styles.item}>
              <div className={styles.item__header}>
                <button
                  className={styles.item__remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  <img src="/img/Close__.png" alt="remove" />{' '}
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.item__img}
                />
                <p className={styles.item__name}>{item.name}</p>
              </div>

              <div className={styles.item__footer}>
                <div className={styles.quantity}>
                  <button
                    className={styles.quantity__btn}
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <img src="/img/Minus.svg" alt="minus" />
                  </button>
                  <span className={styles.quantity__count}>
                    {item.quantity || 1}
                  </span>
                  <button
                    className={styles.quantity__btn}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <img src="/img/Plus.svg" alt="plus" />
                  </button>
                </div>
                <p className={styles.item__price}>
                  ${item.price * (item.quantity || 1)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Блок Summary */}
        {cart.length > 0 && (
          <div className={styles.summary}>
            <h2 className={styles.summary__total}>${totalPrice}</h2>
            <p className={styles.summary__text}>
              Total for {cart.length} items
            </p>
            <div className={styles.summary__line}></div>
            <button className={styles.summary__checkout}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

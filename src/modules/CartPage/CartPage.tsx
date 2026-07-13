import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Додав Link
import styles from './CartPage.module.scss';
import { useCart } from '../shared/context/CartContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const navigate = useNavigate();

  return (
    <div className={styles.cart_page}>
      <button
        onClick={() => navigate(-1)}
        className={styles.cart_page__back_link}
      >
        <img
          src="/img/icons/arrow-to-left.svg"
          alt="Arrow to left"
          className={styles.cart_page__back_icon}
        />
        Back
      </button>

      <h1 className={styles.cart_page__title}>Cart</h1>

      {cart.length === 0 ? (
        <h2>Cart is empty</h2>
      ) : (
        <div className={styles.cart_page__content}>
          <div className={styles.cart_page__list}>
            {cart.map(item => (
              <div key={item.id} className={styles.cart_item}>
                <button
                  className={styles.cart_item__remove}
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>

                <Link to={`/${item.category}/${item.id}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className={styles.cart_item__img}
                  />
                </Link>

                <Link
                  to={`/${item.category}/${item.id}`}
                  className={styles.cart_item__name_link}
                >
                  <p className={styles.cart_item__name}>{item.name}</p>
                </Link>

                <div className={styles.cart_item__controls}>
                  <button
                    className={styles.cart_item__btn}
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className={styles.cart_item__quantity}>
                    {item.quantity}
                  </span>
                  <button
                    className={styles.cart_item__btn}
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <h3 className={styles.cart_item__price}>${item.price}</h3>
              </div>
            ))}
          </div>

          <div className={styles.checkout_summary}>
            <h2 className={styles.checkout_summary__price}>${totalPrice}</h2>
            <p className={styles.checkout_summary__info}>
              Total for {totalItems} items
            </p>
            <div className={styles.checkout_summary__divider}></div>
            <button className={styles.checkout_summary__btn}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

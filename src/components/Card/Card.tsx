import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import styles from './Card.module.scss';

export const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, changeQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const isConfirmed = window.confirm(t('cart.checkout_confirm'));

    if (isConfirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__container}>
        <button className={styles.cart__back} onClick={() => navigate(-1)}>
          {t('product.back')}
        </button>

        <h1 className={styles.cart__title}>{t('nav.cart')}</h1>

        {cartItems.length > 0 ? (
          <div className={styles.cart__content}>
            <div className={styles.cart__items}>
              {cartItems.map(item => (
                <article key={item.itemId} className={styles['cart-card']}>
                  <div className={styles['cart-card__info']}>
                    <button
                      className={styles['cart-card__remove']}
                      onClick={() => removeFromCart(item.itemId)}
                      aria-label="Remove item"
                    />
                    <Link
                      to={`/${item.category}/${item.itemId}`}
                      className={styles['cart-card__info']}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={styles['cart-card__image']}
                      />
                      <p className={styles['cart-card__name']}>
                        {item.name.split(' (')[0]}
                      </p>
                    </Link>
                  </div>

                  <div className={styles['cart-card__controls']}>
                    <div className={styles['cart-card__quantity']}>
                      <button
                        className={styles['cart-card__btn']}
                        onClick={() => changeQuantity(item.itemId, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className={styles['cart-card__count']}>
                        {item.quantity}
                      </span>
                      <button
                        className={styles['cart-card__btn']}
                        onClick={() => changeQuantity(item.itemId, 1)}
                      >
                        +
                      </button>
                    </div>
                    <h2 className={styles['cart-card__price']}>
                      ${item.price * item.quantity}
                    </h2>
                  </div>
                </article>
              ))}
            </div>

            <div className={`${styles.cart__summary} ${styles.summary}`}>
              <h2 className={styles.summary__total}>${totalPrice}</h2>
              <p className={styles.summary__count}>
                {t('cart.total_items', { count: totalItems })}
              </p>
              <div className={styles.summary__line} />
              <button
                className={styles.summary__checkout}
                onClick={handleCheckout}
              >
                {t('main.checkout')}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.cart__empty}>
            <h2>{t('catalog.no_results')}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

import styles from './Cart.module.scss';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowLeftWhite from '../../assets/icons/arrow-left-white.svg';

import { useNavigate } from 'react-router-dom';
import { CartItem } from '../CartItem/CartItem';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { saveCartItems } from '../../api/cart';
import { useLanguage } from '../context/LanguageContext';
import emtyCart from '../../assets/images/cart-is-empty.png';
import { useTheme } from '../context/ThemeContext';

export const Cart = () => {
  const navigate = useNavigate();
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('Cart must be used inside CartProvider');
  }

  const { cartItems, setCartItems } = context;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleCheckout = () => {
    const shouldClearCart = confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (shouldClearCart) {
      setCartItems([]);
      saveCartItems([]);
    }
  };

  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div>
      <div className={styles.carts}>
        <button
          type="button"
          className={styles.buttonTop}
          onClick={() => navigate(-1)}
        >
          <span className={styles.icon}>
            <img
              src={theme === 'dark' ? arrowLeftWhite : arrowLeft}
              alt=""
              className={styles.arrow}
            />
          </span>
          <span className={styles.text}>{t('Back')}</span>
        </button>

        <h1 className={styles.title}>{t('Cart')}</h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <img src={emtyCart} alt="" className={styles.emptyCartImage} />

            <h2 className={styles.emptyCartTitle}>{t('EmptyCart')}</h2>
            <p className={styles.emptyCartText}>{t('EmptyCartText')}</p>
            <button
              type="button"
              className={styles.startShopping}
              onClick={() => navigate('/')}
            >
              {t('StartShopping')}
            </button>
          </div>
        ) : (
          <div className={styles.wrapper}>
            <div className={styles.content}>
              {cartItems.map(item => (
                <CartItem item={item} key={item.itemId} />
              ))}
            </div>
            <div className={styles.summary}>
              <p className={styles.totalPrice}>${totalPrice}</p>
              <p className={styles.par}>
                {t('TotalFor')} {totalItems}{' '}
                {totalItems === 1 ? t('item') : t('items')}
              </p>
              <div className={styles.divider} />
              <button
                type="button"
                className={styles.checkout}
                onClick={handleCheckout}
              >
                {t('Checkout')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

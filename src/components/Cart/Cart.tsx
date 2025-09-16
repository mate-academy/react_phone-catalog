import styles from './Cart.module.scss';
import { useCart } from '../../contexts/CartContext';
import { Item } from '../../types/Item';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

export const Cart = () => {
  const { theme } = useTheme();
  const { cartItems, setCartItems, setCartItemsIds, totalAmount, totalQuantity } = useCart();
  const { t } = useTranslation();

  const removeFromCart = (item: Item) => {
    setCartItems(prev => prev.filter(prevItem => prevItem.id !== item.id));
    setCartItemsIds(prev => prev.filter(prevId => prevId !== item.id));
  };

  const increaseQuantity = (item: Item) => {
    setCartItems(prev =>
      prev.map(x => (x.id === item.id ? { ...item, quantity: x.quantity + 1 } : x)),
    );
  };

  const decreaseQuantity = (item: Item) => {
    if (item.quantity === 1) {
      return;
    }

    setCartItems(prev =>
      prev.map(x => (x.id === item.id ? { ...item, quantity: x.quantity - 1 } : x)),
    );
  };

  const handleCheckout = () => {
    const confirmed = confirm('Checkout is not implemented yet. Do you want to clear the Cart?');

    if (confirmed) {
      setCartItems([]);
    }
  };

  return (
    <section className={styles.cart}>
      <div className={styles.cart__navigation}>
        <Link
          to=".."
          relative="path"
          className={`${styles.cart__linkBack} ${theme === 'light' && styles['cart__linkBack--lightTheme']}`}
        >
          {t('elements.back')}
        </Link>
      </div>

      <h1 className={styles.cart__title}>{t('sections.cart')}</h1>

      {cartItems.length === 0 ? (
        <div className={styles.cart__emptyBox}>
          <p className={styles.cart__emptyMessage}>{t('errors.emptyCart')}</p>
          <img
            src="public/img/icons/empty-cart.webp"
            alt="Empty cart"
            className={styles.cart__emptyPhoto}
          />
        </div>
      ) : (
        <div className={styles.cart__content}>
          <div className={styles.cart__list}>
            {cartItems.map(item => (
              <div
                className={`${styles.cart__item} ${theme === 'light' && styles['cart__item--lightTheme']}`}
                key={item.id}
              >
                <a
                  className={`${styles.cart__itemRemove} ${theme === 'light' && styles['cart__itemRemove--lightTheme']}`}
                  onClick={() => removeFromCart(item)}
                ></a>
                <img src={item.images[0]} alt="Cart item" className={styles.cart__itemPhoto} />
                <p className={styles.cart__itemTitle}>{item.name}</p>

                <div className={styles.cart__itemQuantity}>
                  <button
                    className={`${styles.cart__quantityBtn} ${theme === 'light' && styles['cart__quantityBtn--lightTheme']} ${item.quantity === 1 && styles['cart__quantityBtn--disabled']} ${item.quantity === 1 && theme === 'light' && styles['cart__quantityBtn--lightTheme-disabled']}`}
                    onClick={() => decreaseQuantity(item)}
                  >
                    -
                  </button>
                  <p className={styles.cart__quantityValue}>{item.quantity}</p>
                  <button
                    className={`${styles.cart__quantityBtn} ${theme === 'light' && styles['cart__quantityBtn--lightTheme']}`}
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </button>
                </div>

                <p className={styles.cart__itemPrice}>${item.priceDiscount * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className={styles.cart__checkout}>
            <h2 className={styles.cart__checkoutAmount}>${totalAmount}</h2>
            <p className={styles.cart__checkoutQuantity}>
              {totalQuantity === 1
                ? t('elements.totalOne', { count: totalQuantity })
                : t('elements.totalMore', { count: totalQuantity })}
            </p>
            <button
              className={`${styles.cart__checkoutButton} ${theme === 'light' && styles['cart__checkoutButton--lightTheme']}`}
              onClick={() => handleCheckout()}
            >
              {t('elements.checkout')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

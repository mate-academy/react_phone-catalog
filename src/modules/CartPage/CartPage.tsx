import { useEffect, useState } from 'react';
import styles from './CartPage.module.scss';
import { useCart } from '../../contexts/CartContext';
import { BackButton } from '../../components/BackButton/BackButton';
import RemoveIcon from '../../assets/icons/Close.svg';
import MinusIcon from '../../assets/icons/Minus.svg';
import PlusIcon from '../../assets/icons/Plus.svg';
import { Loader } from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';

export const CartPage = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } =
    useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);

    return () => clearTimeout(timer);
  }, []);

  const parsePrice = (price: string | number) => {
    if (typeof price === 'number') {
      return price;
    }

    return Number(price.toString().replace('$', '')) || 0;
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const confirmed = window.confirm(t('cart.checkoutConfirm'));

    if (confirmed) {
      clearCart();
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <BackButton className={styles.backButton} />
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>{t('cart.title')}</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>{t('cart.empty')}</p>
        </div>
      ) : (
        <div className={styles.grid}>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.topRow}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <img src={RemoveIcon} alt={t('cart.remove')} />
                  </button>

                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImage}
                  />

                  <span className={styles.itemTitle}>{item.title}</span>
                </div>
                <div className={styles.bottomRow}>
                  <div className={styles.counter}>
                    <button
                      onClick={() => decreaseQty(item.id)}
                      disabled={item.quantity === 1}
                    >
                      <img src={MinusIcon} alt={t('cart.decrease')} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item.id)}>
                      <img src={PlusIcon} alt={t('cart.increase')} />
                    </button>
                  </div>

                  <span className={styles.itemPrice}>
                    ${parsePrice(item.price) * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <span className={styles.totalPrice}>${totalPrice}</span>
            <p className={styles.totalItems}>
              {t('cart.totalForItems', { count: totalQuantity })}
            </p>
            <hr className={styles.divider} />
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              {t('cart.checkout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

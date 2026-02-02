import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CartItem } from '../../components/CartItem';
import { useCart } from '../../context/CartContext';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    cartItems,
    totalItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.phone.priceDiscount || item.phone.priceRegular;

    return sum + price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          <img src="/img/arrow_left.svg" alt={t('icons.backAlt')} />
          {t('common.back')}
        </button>

        <h1 className={styles.title}>{t('cartPage.title')}</h1>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>{t('cartPage.empty')}</p>
        ) : (
          <div className={styles.content}>
            <div className={styles.items}>
              {cartItems.map(item => (
                <CartItem
                  key={item.phone.id}
                  phone={item.phone}
                  quantity={item.quantity}
                  onRemove={() => removeFromCart(item.phone.id)}
                  onIncrease={() => increaseQuantity(item.phone.id)}
                  onDecrease={() => decreaseQuantity(item.phone.id)}
                />
              ))}
            </div>

            <div className={styles.summary}>
              <div className={styles.totalPrice}>${totalPrice}</div>
              <div className={styles.totalItems}>
                {t('cartPage.totalFor', { count: totalItems })}
              </div>
              <div className={styles.divider} />
              <button type="button" className={styles.checkout}>
                {t('cartPage.checkout')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

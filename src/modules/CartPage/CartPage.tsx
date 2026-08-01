import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useCart, useTranslation } from '@shared/context';
import { chevronRightGrayIcon } from '@shared/assets/icons';
import { CartItem } from './components/CartItem';
import { CheckoutModal } from './components/CheckoutModal';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const { t, tCount } = useTranslation();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const {
    items,
    totalQuantity,
    totalPrice,
    removeFromCart,
    setQuantity,
    clearCart,
  } = useCart();

  const handleConfirm = () => {
    clearCart();
    setIsCheckingOut(false);
  };

  return (
    <div className={styles.page}>
      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        <img
          src={chevronRightGrayIcon}
          alt=""
          className={cn('icon-muted', styles.backIcon)}
        />
        {t('common.back')}
      </button>

      <h1 className={styles.title}>{t('cart.title')}</h1>

      {!items.length ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>{t('cart.empty')}</p>

          <img
            src="img/cart-is-empty.png"
            alt=""
            className={styles.emptyImage}
          />

          <Link to="/phones" className={styles.emptyLink}>
            {t('cart.startShopping')}
          </Link>
        </div>
      ) : (
        <div className={styles.content}>
          <ul className={styles.list}>
            {items.map(item => (
              <li key={item.id}>
                <CartItem
                  item={item}
                  onRemove={removeFromCart}
                  onQuantityChange={setQuantity}
                />
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <p className={styles.totalPrice}>{`$${totalPrice}`}</p>

            <p className={styles.totalCount}>
              {tCount('cart.totalFor', totalQuantity)}
            </p>

            <span className={styles.divider} />

            <button
              type="button"
              className={styles.checkout}
              onClick={() => setIsCheckingOut(true)}
            >
              {t('cart.checkout')}
            </button>
          </div>
        </div>
      )}

      {isCheckingOut && (
        <CheckoutModal
          onConfirm={handleConfirm}
          onCancel={() => setIsCheckingOut(false)}
        />
      )}
    </div>
  );
};

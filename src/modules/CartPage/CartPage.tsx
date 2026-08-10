import { useNavigate } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { getPublicPath } from '../../utils/getPublicPath';
import { CartItemCard } from './components/CartItemCard';
import styles from './CartPage.module.scss';

export const CartPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const {
    cartItems,
    changeQuantity,
    clearCart,
    hasCartError,
    isCartLoading,
    reloadCart,
    removeFromCart,
  } = useCart();

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const shouldClearCart = window.confirm(t('cart.checkoutConfirm'));

    if (shouldClearCart) {
      clearCart();
    }
  };

  return (
    <div className={`container ${styles.page}`}>
      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
        style={
          {
            '--back-icon': `url("${getPublicPath('img/chevron-left.svg')}")`,
          } as React.CSSProperties
        }
      >
        <img
          src={getPublicPath('img/chevron-left.svg')}
          alt=""
          aria-hidden="true"
        />
        {t('common.back')}
      </button>

      <h1 className={styles.title}>{t('cart.title')}</h1>

      {isCartLoading && <Loader />}

      {!isCartLoading && hasCartError && (
        <div className={styles.messageBlock}>
          <p>{t('common.somethingWrong')}</p>
          <button type="button" onClick={reloadCart}>
            {t('common.reload')}
          </button>
        </div>
      )}

      {!isCartLoading && !hasCartError && cartItems.length === 0 && (
        <div className={styles.messageBlock}>
          <p>{t('cart.empty')}</p>
        </div>
      )}

      {!isCartLoading && !hasCartError && cartItems.length > 0 && (
        <div className={styles.content}>
          <div className={styles.items}>
            {cartItems.map(({ id, product, quantity }) => (
              <CartItemCard
                key={id}
                product={product}
                quantity={quantity}
                onRemove={() => removeFromCart(id)}
                onChangeQuantity={nextQuantity =>
                  changeQuantity(id, nextQuantity)
                }
              />
            ))}
          </div>

          <aside className={styles.summary} aria-label={t('cart.orderSummary')}>
            <p className={styles.totalPrice}>${totalPrice}</p>
            <p className={styles.totalCount}>
              {t('cart.totalFor', { count: totalQuantity })}
            </p>

            <div className={styles.divider} />

            <button
              type="button"
              className={styles.checkout}
              onClick={handleCheckout}
            >
              {t('cart.checkout')}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CartPage.module.scss';
import { useCart } from '../../utils/hooks/Context/useCart';
import { Back } from '../../elements/Back';
import { CartItem } from '../../components/CartItem';
import { Plug } from '../../components/Plug/Plug';
import { useModalWindow } from '../../utils/hooks/UI/useModalWindow';
import { ConfirmModal } from '../../components/ConfirmModal';

export const CartPage = () => {
  const { t, i18n } = useTranslation();
  const { cart, error, clearCart } = useCart();

  const { isOpen, toggle, close } = useModalWindow();

  const onCheckoutClick = () => toggle();

  const handleConfirm = () => {
    clearCart();
    close();
  };

  const checkoutRef = useRef<HTMLDivElement | null>(null);
  const [isFloating, setIsFloating] = useState(false);

  const totalAmount = cart.reduce(
    (sum, product) => sum + product.price * product.count,
    0,
  );

  const totalCount = cart.reduce((count, product) => count + product.count, 0);

  const formattedTotal = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalAmount);

  const isPlugVisible = !error && cart.length === 0;

  useEffect(() => {
    if (!checkoutRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFloating(entry.intersectionRatio < 0.1);
      },
      {
        threshold: [0, 0.1],
      },
    );

    observer.observe(checkoutRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.CartPage__section}>
      <Back />

      <h1 className={styles['CartPage__header-text']}>{t('cartPage')}</h1>

      {error && <p className={styles.error}>{t(`errors.${error}`)}</p>}
      {isPlugVisible && (
        <div className={styles.CartPage__plug}>
          <Plug label={t('emptyCart')} image="img/cart-is-empty.png" />
        </div>
      )}

      {!isPlugVisible && (
        <>
          <div className={styles.CartPage__content}>
            <div className={styles['CartPage__list-block']}>
              {cart.map(product => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>

            <div className={styles['CartPage__checkout-block']}>
              <div ref={checkoutRef} className={styles.CartPage__checkout}>
                <h2 className={styles.CartPage__price}>
                  <strong>{formattedTotal}</strong>
                </h2>
                <p className={styles['CartPage__total-count']}>
                  {t('itemtsTotal', { total: totalCount })}
                </p>
                <div className={styles.CartPage__seperator} />
                <button
                  onClick={onCheckoutClick}
                  className="button button--filled button--width100 button--bigest"
                >
                  {t('checkout')}
                </button>
              </div>
            </div>
          </div>

          {isFloating && (
            <div className={styles.CartPage__floating}>
              <button
                onClick={onCheckoutClick}
                className="button button--filled button--width100 button--bigest"
              >
                {t('checkout')} · {formattedTotal}
              </button>
            </div>
          )}
        </>
      )}

      <ConfirmModal
        isOpen={isOpen}
        title={t('checkoutModal.title')}
        description={t('checkoutModal.description')}
        cancelText={t('no')}
        confirmText={t('yes')}
        onCancel={close}
        onConfirm={handleConfirm}
      />
    </section>
  );
};

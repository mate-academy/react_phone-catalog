import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import styles from './CartTotal.module.scss';

export const CartTotal: React.FC = () => {
  const { t } = useTranslation();
  const { getTotalPrice, getTotalQuantity, clearCart } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalQuantity();

  const handleCheckout = () => {
    const confirmed = window.confirm(t('checkoutNotImplemented'));

    if (confirmed) {
      clearCart();
    }
  };

  return (
    <div className={styles.cartTotal}>
      <div className={styles.totalSection}>
        <div className={styles.totalAmount}>${totalPrice}</div>
        <div className={styles.totalLabel}>{t('totalFor', { count: totalItems })}</div>
      </div>

      <button className={styles.checkoutButton} onClick={handleCheckout}>
        {t('checkout')}
      </button>
    </div>
  );
};

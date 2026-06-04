import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CartSummary.module.scss';

import { useCart } from '../../../../hooks/useCart';
import { getProductPrice } from '../../../../utils/priceHelper';

export const CartSummary = () => {
  const { cart, cartCount } = useCart();

  const { t } = useTranslation();

  const totalPrice = cart.reduce((total, item) => {
    const { currentPrice } = getProductPrice(item.product);

    return total + currentPrice * item.quantity;
  }, 0);

  return (
    <div className={styles.summary}>
      <div className={styles.info}>
        <h2 className={styles.totalPrice}>${totalPrice}</h2>
        <p className={styles.countText}>
          {t('cart.totalForItems', { count: cartCount })}
        </p>
      </div>

      <div className={styles.divider} />

      <button
        className={styles.checkoutButton}
        onClick={() => alert(t('cart.alertCheckout'))}
      >
        {t('cart.checkout')}
      </button>
    </div>
  );
};

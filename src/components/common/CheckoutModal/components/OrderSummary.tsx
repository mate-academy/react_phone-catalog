import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/formatPrice';
import type { OrderSummaryProps } from '../CheckoutModal.types';

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  styles,
  cartItems,
  totalItems,
  totalPrice,
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className={styles.summary}>
      <h2>{t('checkout.summary')}</h2>

      {cartItems.map((item) => (
        <div
          key={item.itemUniqueId}
          className={styles.summaryItem}
        >
          <div className={styles.summaryItemRow}>
            <p className={styles.productName}>{item.name}</p>
            <p className={styles.productQty}>
              {item.quantity} ×{' '}
              {formatPrice(item.priceDiscount ?? item.price, currentLang)}
            </p>
          </div>
        </div>
      ))}

      <div className={styles.totalBlock}>
        <p>{t('cart.total_items', { count: totalItems })}</p>
        <h3>{formatPrice(totalPrice, currentLang)}</h3>
      </div>
    </div>
  );
};

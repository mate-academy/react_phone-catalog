import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './EmptyOrders.module.scss';

export const EmptyOrders: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyOrders}>
      <div className={styles.emptyOrders__icon}>📦</div>
      <p className={styles.emptyOrders__text}>{t('orders.empty_title')}</p>
      <p className={styles.emptyOrders__sub}>{t('orders.empty_sub')}</p>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './EmptyCart.module.scss';

import emptyCartImg from '../../../../img/cart-is-empty.png';

export const EmptyCart: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyCart}>
      <div className={styles.imageWrapper}>
        <img src={emptyCartImg} alt="Empty cart" className={styles.image} />
      </div>

      <h2>{t('emptyCart.title')}</h2>
      <p className={styles.description}>{t('emptyCart.description')}</p>

      <Link to="/phones" className={styles.button}>
        {t('emptyCart.buttonCheckout')}
      </Link>
    </div>
  );
};

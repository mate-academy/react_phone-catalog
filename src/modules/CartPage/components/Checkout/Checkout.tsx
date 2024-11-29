import styles from './Checkout.module.scss';
import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface Props {
  totalPrice: number;
  numOfProducts: number;
  handleModal: (open: boolean) => void;
}

export const Checkout: React.FC<Props> = ({
  totalPrice,
  numOfProducts,
  handleModal,
}) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.totalContainer}>
        <span className={styles.totalPrice}>{'$' + totalPrice}</span>
        <p className={styles.totalText}>
          {t('checkout', { count: numOfProducts })}
        </p>
      </div>
      <button
        className={classNames(styles.btnCheckout, 'btnCart')}
        onClick={() => handleModal(true)}
        aria-label={t('accessibility.checkout')}
      >
        {t('buttons.checkout')}
      </button>
    </div>
  );
};

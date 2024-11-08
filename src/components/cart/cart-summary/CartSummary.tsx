import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useCart } from '@hooks/useCart';

import styles from './CartSummary.module.scss';

type TProps = {
  toggleModal: () => void;
};

export const CartSummary: FC<TProps> = ({ toggleModal }) => {
  const { totalPrice, totalQuantity } = useCart();
  const { t } = useTranslation();

  const localPrice = t('price.main', { val: totalPrice });
  const localLabel = t('cart.summary.label');
  const localCheckout = t('cart.summary.checkout');
  const localItems = t('cart.item', {
    count: totalQuantity,
    item: totalQuantity,
  });

  return (
    <div className={styles.summary}>
      <span aria-live="polite" aria-label={localPrice}>
        ${totalPrice}
      </span>
      <p>{localItems}</p>
      <div className={styles.separator}></div>
      <button
        type="button"
        onClick={toggleModal}
        aria-haspopup="dialog"
        aria-label={localLabel}
      >
        {localCheckout}
      </button>
    </div>
  );
};

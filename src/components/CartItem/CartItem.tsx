import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './CartItem.module.scss';
import { Phone } from '../../types/Phone';

type Props = {
  phone: Phone;
  quantity: number;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const CartItem = ({
  phone,
  quantity,
  onRemove,
  onIncrease,
  onDecrease,
}: Props) => {
  const { t } = useTranslation();
  const imageUrl = `/${phone.images[0]}`;
  const price = phone.priceDiscount || phone.priceRegular;
  const isMinusDisabled = quantity <= 1;

  return (
    <div className={styles.item}>
      <button type="button" className={styles.remove} onClick={onRemove}>
        <img src="/img/close.svg" alt={t('icons.removeAlt')} />
      </button>

      <Link to={`/product/${phone.id}`} className={styles.imageLink}>
        <img className={styles.image} src={imageUrl} alt={phone.name} />
      </Link>

      <Link to={`/product/${phone.id}`} className={styles.titleLink}>
        <div className={styles.title}>{phone.name}</div>
      </Link>

      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.qtyButton}
          onClick={onDecrease}
          disabled={isMinusDisabled}
        >
          <img src="/img/minus.svg" alt={t('icons.minusAlt')} />
        </button>
        <span className={styles.qtyValue}>{quantity}</span>
        <button type="button" className={styles.qtyButton} onClick={onIncrease}>
          <img src="/img/plus.svg" alt={t('icons.plusAlt')} />
        </button>
      </div>

      <div className={styles.price}>${price}</div>
    </div>
  );
};

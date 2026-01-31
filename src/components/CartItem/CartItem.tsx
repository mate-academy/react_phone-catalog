import React from 'react';
import styles from './CartItem.module.scss';
import { Phone } from '../../types/Phone';

type Props = {
  phone: Phone;
  quantity: number;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const CartItem: React.FC<Props> = ({
  phone,
  quantity,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  const imageUrl = `/${phone.images[0]}`;
  const price = phone.priceDiscount || phone.priceRegular;
  const isMinusDisabled = quantity <= 1;

  return (
    <div className={styles.item}>
      <button type="button" className={styles.remove} onClick={onRemove}>
        <img src="/img/close.svg" alt="Remove" />
      </button>

      <img className={styles.image} src={imageUrl} alt={phone.name} />

      <div className={styles.title}>{phone.name}</div>

      <div className={styles.quantity}>
        <button
          type="button"
          className={styles.qtyButton}
          onClick={onDecrease}
          disabled={isMinusDisabled}
        >
          <img src="/img/minus.svg" alt="Minus" />
        </button>
        <span className={styles.qtyValue}>{quantity}</span>
        <button type="button" className={styles.qtyButton} onClick={onIncrease}>
          <img src="/img/plus.svg" alt="Plus" />
        </button>
      </div>

      <div className={styles.price}>${price}</div>
    </div>
  );
};

import React from 'react';
import { CartItem } from '../../contexts/CartContext';
import styles from './CartRecord.module.scss';

import closeIcon from '../../../assets/icons/close.svg';
import minusIcon from '../../../assets/icons/minus.svg';
import plusIcon from '../../../assets/icons/plus.svg';

type Props = {
  item: CartItem;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
};

export const CartRecord: React.FC<Props> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  const totalPrice = item.product.price * item.quantity;

  return (
    <article className={styles.card}>
      <button
        className={styles.remove}
        type="button"
        aria-label="Remove"
        onClick={() => onRemove(item.id)}
      >
        <img className={styles.removeIcon} src={closeIcon} alt="Remove item" />
      </button>

      <img
        className={styles.image}
        src={item.product.image}
        alt={item.product.name}
      />

      <div className={styles.info}>
        <p className={styles.title}>{item.product.name}</p>
      </div>

      <div className={styles.counter}>
        <button
          className={styles.counterButton}
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onDecrement(item.id)}
        >
          <img
            className={styles.counterIcon}
            src={minusIcon}
            alt="icon minus"
          />
        </button>

        <span className={styles.quantity}>{item.quantity}</span>

        <button
          className={styles.counterButton}
          type="button"
          aria-label="Increase quantity"
          onClick={() => onIncrement(item.id)}
        >
          <img className={styles.counterIcon} src={plusIcon} alt="icon plus" />
        </button>
      </div>

      <p className={styles.price}>${totalPrice}</p>
    </article>
  );
};

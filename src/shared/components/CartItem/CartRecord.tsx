import React from 'react';
import { CartItem } from '../../contexts/CartContext';
import styles from './CartRecord.module.scss';

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
        <img
          className={styles.removeIcon}
          src="/icons/close.svg"
          alt="Remove item"
        />
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
            src="/icons/minus.svg"
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
          <img
            className={styles.counterIcon}
            src="/icons/plus.svg"
            alt="icon plus"
          />
        </button>
      </div>

      <p className={styles.price}>${totalPrice}</p>
    </article>
  );
};

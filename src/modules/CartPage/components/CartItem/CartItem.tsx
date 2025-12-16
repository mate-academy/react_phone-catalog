import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CartItem.module.scss';
import type { CartItem as CartItemType } from '../../../shared/context';

type Props = {
  item: CartItemType;
  onRemove: (id: string) => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
};

export const CartItem: React.FC<Props> = ({ item, onRemove, onInc, onDec }) => {
  if (!item?.product?.image) {
    return null;
  }

  const imageSrc = item.product.image.startsWith('/')
    ? item.product.image
    : `/${item.product.image}`;

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.remove}
        aria-label="Remove item"
        onClick={() => onRemove(item.id)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path
            d="M3 3L13 13M13 3L3 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <Link to={`/product/${item.id}`} className={styles.imageLink}>
        <img className={styles.image} src={imageSrc} alt={item.product.name} />
      </Link>

      <Link to={`/product/${item.id}`} className={styles.name}>
        {item.product.name}
      </Link>

      <div className={styles.counter}>
        <button
          type="button"
          className={styles.counterBtn}
          onClick={() => onDec(item.id)}
          aria-label="Decrease quantity"
          disabled={item.quantity === 1}
        >
          –
        </button>

        <span className={styles.qty}>{item.quantity}</span>

        <button
          type="button"
          className={styles.counterBtn}
          onClick={() => onInc(item.id)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className={styles.price}>${item.product.price * item.quantity}</div>
    </div>
  );
};

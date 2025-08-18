import React from 'react';
import { Product } from '../../types/Product';
import styles from './CartItem.module.scss';
import { Delete, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  item: Product & { quantity: number };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const itemPrice = item.priceDiscount ?? item.price ?? 0;

  const slug = item.itemId || String(item.id);
  const imgSrc = item.image
    ? item.image
    : item.images?.[0]
      ? item.images[0]
      : undefined;

  return (
    <div className={styles.item}>
      <button
        className={styles.removeButton}
        onClick={onRemove}
        aria-label="Remove from cart"
        type="button"
      >
        <Delete />
      </button>

      <Link to={`/product/${slug}`} className={styles.imageWrapper}>
        {imgSrc && (
          <img src={`./${imgSrc}`} alt={item.name} className={styles.image} />
        )}
      </Link>

      <Link to={`/product/${slug}`} className={styles.name}>
        {item.name}
      </Link>

      <div className={styles.quantityControls}>
        <button
          onClick={onDecrease}
          className={styles.controlButton}
          disabled={item.quantity <= 1}
          type="button"
        >
          <Minus />
        </button>

        <span className={styles.quantity}>{item.quantity}</span>

        <button
          onClick={onIncrease}
          className={styles.controlButton}
          type="button"
        >
          <Plus />
        </button>
      </div>

      <p className={styles.price}>${itemPrice * item.quantity}</p>
    </div>
  );
};

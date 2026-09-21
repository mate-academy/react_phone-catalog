import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem as CartItemType } from '../../../../context/CartContext';
import styles from './CartItem.module.scss';

interface Props {
  item: CartItemType;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<Props> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const { product, quantity } = item;

  return (
    <div className={styles.item}>
      <button
        type="button"
        onClick={() => onRemove(product.id)}
        className={styles.removeBtn}
        aria-label="Remove item"
      >
        ✕
      </button>

      <Link to={`/product/${product.itemId}`} className={styles.imageBox}>
        <img
          src={`./${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.name}>
        {product.name}
      </Link>

      <div className={styles.quantityControls}>
        <button
          type="button"
          disabled={quantity <= 1}
          onClick={() => onQuantityChange(product.id, -1)}
          className={styles.qtyBtn}
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span className={styles.count}>{quantity}</span>

        <button
          type="button"
          onClick={() => onQuantityChange(product.id, 1)}
          className={styles.qtyBtn}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className={styles.price}>${product.price * quantity}</div>
    </div>
  );
};

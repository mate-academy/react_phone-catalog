import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './CartItem.module.scss';

// інтерфейс пропсів робимо ширшим, щоб компонент знав про нові функції та кількість
interface CartItemProps {
  product: Product & { quantity: number };
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { itemId, name, price, image } = product;

  const imageUrl = image.startsWith('/') ? image.substring(1) : image;

  return (
    <div className={styles.cartItem}>
      <button
        type="button"
        className={styles.removeButton}
        onClick={onRemove}
        aria-label="Remove item"
      >
        ✕
      </button>

      <Link to={`/product/${itemId}`} className={styles.imageLink}>
        <img
          src={imageUrl}
          alt={name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${itemId}`} className={styles.titleLink}>
        <span className={styles.title}>{name}</span>
      </Link>

      {/* лічильник */}
      <div className={styles.counterWrapper}>
        <button
          type="button"
          className={styles.counterButton}
          onClick={onDecrease}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className={styles.counterValue}>{quantity}</span>
        <button
          type="button"
          className={styles.counterButton}
          onClick={onIncrease}
        >
          +
        </button>
      </div>

      {/* артість з урахуванням кількості */}
      <span className={styles.price}>${price * quantity}</span>
    </div>
  );
};

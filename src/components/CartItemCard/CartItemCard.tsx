import styles from './CartItemCard.module.scss';
import React from 'react';
import { Product } from '../../features/types/productType';
import { Link } from 'react-router-dom';
import { SecondaryButton } from '../SecondaryButton';

type Props = {
  product: Product;
  quantity: number;
  onRemove: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
};

export const CartItemCard: React.FC<Props> = ({
  product,
  quantity,
  onRemove,
  onDecrease,
  onIncrease,
}) => {
  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItem__part}>
        <button
          type="button"
          className={styles.cartItem__removeButton}
          onClick={onRemove}
          aria-label={`Remove ${product.name} from cart`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <Link
          to={`/${product.category}/${product.itemId}`}
          className={styles.cartItem__link}
        >
          <div className={styles.cartItem__imageWrapper}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.cartItem__image}
            />
          </div>

          <p className={styles.cartItem__name}>{product.name}</p>
        </Link>
      </div>

      <div className={styles.cartItem__part}>
        <div className={styles.cartItem__quantity}>
          <SecondaryButton onClick={onDecrease} disabled={quantity <= 1}>
            -
          </SecondaryButton>

          <p className={styles.cartItem__quantityValue}>{quantity}</p>

          <SecondaryButton onClick={onIncrease}>+</SecondaryButton>
        </div>

        <p className={styles.cartItem__price}>${product.price}</p>
      </div>
    </article>
  );
};

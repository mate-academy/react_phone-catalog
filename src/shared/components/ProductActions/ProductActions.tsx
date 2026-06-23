import styles from './ProductActions.module.scss';
import type { Product } from '../../../types';

type Props = {
  product: Product;
  isInCart: boolean;
  isFavorite: boolean;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
};

export const ProductActions: React.FC<Props> = ({
  product,
  isInCart,
  isFavorite,
  onAddToCart,
  onToggleFavorite,
}) => {
  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.cartButton}
        disabled={isInCart}
        onClick={() => onAddToCart?.(product)}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        type="button"
        className={`${styles.favButton} ${isFavorite ? styles.favActive : ''}`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite?.(product as Product)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={isFavorite ? '#EB5757' : 'none'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            // eslint-disable-next-line max-len
            d="M8 14s-5-3.33-5-7.5A2.5 2.5 0 0 1 5.5 4c1.04 0 2 .64 2.5 1.5C8.5 4.64 9.46 4 10.5 4A2.5 2.5 0 0 1 13 6.5C13 10.67 8 14 8 14Z"
            stroke={isFavorite ? '#EB5757' : '#F1F2F9'}
            strokeWidth="1.2"
          />
        </svg>
      </button>
    </div>
  );
};

import { Link } from 'react-router-dom';
import heartIcon from '@/assets/icons/icon-favorites.svg';
import type { Product } from '@/types/Product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const hasDiscount = product.fullPrice > product.price;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/product/${product.itemId}`}>
          <img
            src={`/${product.image}`}
            alt={product.name}
            className={styles.image}
          />
        </Link>
      </div>

      <div className={styles.titleWrapper}>
        <Link to={`/product/${product.itemId}`} className={styles.title}>
          {product.name}
        </Link>
      </div>

      <div className={styles.price}>
        <span className={styles.currentPrice}>${product.price}</span>
        {hasDiscount && (
          <span className={styles.oldPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.addToCart}>Add to cart</button>
        <button
          className={styles.addToFavorites}
          aria-label="Add to favourites"
        >
          <img src={heartIcon} alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

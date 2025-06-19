import React from 'react';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { FavoritesButton } from '../FavoritesButton/FavoritesButton';

interface Props {
  product: Product;
  showFullPrice?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  // showFullPrice = false,
  showFullPrice,
}) => {
  const imagePath = product.image || product.images?.[0] || '';

  return (
    <div className={styles.card}>
      <img src={imagePath} alt={product.name} className={styles.image} />

      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.name}
      >
        {product.name}
      </Link>

      <div className={styles.prices}>
        <p className={styles.price}>${product.price}</p>
        {showFullPrice && product.fullPrice > product.price && (
          <p className={styles.fullPrice}>${product.fullPrice}</p>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.row}>
          <span className={styles.key}>Screen</span>
          <span className={styles.value}>{product.screen || '—'}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Capacity</span>
          <span className={styles.value}>{product.capacity || '—'}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>RAM</span>
          <span className={styles.value}>{product.ram || '—'}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <AddToCartButton product={product} />
        <FavoritesButton productId={product.itemId} />
      </div>
    </div>
  );
};

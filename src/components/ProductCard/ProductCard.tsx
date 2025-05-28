import React from 'react';
import styles from './ProductCard.module.scss';
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
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />
      <h3 className={styles.name}>{product.name}</h3>
      <div className={styles.prices}>
        {/* <span className={styles.price}>${product.price}</span> */}
        {/* {showFullPrice && product.fullPrice > product.price && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )} */}

        {!showFullPrice ? (
          <p className={styles.price}>${product.price}</p>
        ) : (
          <div className={styles.prices}>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.fullPrice}>${product.fullPrice}</p>
          </div>
        )}
      </div>
      <div className={styles.divider} />
      <div className={styles.specs}>
        <div className={styles.row}>
          <span className={styles.key}>Screen</span>
          <span className={styles.value}>{product.screen}</span>
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
        <FavoritesButton productId={product.id} />
      </div>
    </div>
  );
};

import React from 'react';
import { Product } from '../../../../types/product';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={styles.card}>
      <img src={product.image} alt={product.itemId} className={styles.img} />
      <p className={styles.title}>{product.name}</p>

      <div className={styles.priceContainer}>
        <span className={styles.price}>
          ${product.price || product.fullPrice}
        </span>

        {product.price && product.price !== product.fullPrice && (
          <span className={styles.discount}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>Screen</p>
          <span className={styles.description}>{product.screen}</span>
        </div>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>Capacity</p>
          <span className={styles.description}>{product.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <p className={styles.specTitle}>RAM</p>
          <span className={styles.description}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.addToCart}>Add to cart</button>
        <div>
          <button className={styles.iconLink} aria-label="Toggle favorites">
            <img src="/img/icons/favorites.svg" alt="Favorites" />
          </button>
        </div>
      </div>
    </article>
  );
};

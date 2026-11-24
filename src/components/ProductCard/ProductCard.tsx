import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { ProductActions } from '../ProductActions';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.card__link}>
        <div className={styles.card__imageWrapper}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.card__image}
          />
        </div>

        <h3 className={styles.card__name}>{product.name}</h3>
      </Link>

      <div className={styles.card__prices}>
        <span className={styles.card__price}>${product.price}</span>
        <span className={styles.card__priceOld}>${product.fullPrice}</span>
      </div>

      <div className={styles.card__details}>
        <div className={styles.card__detail}>
          <span className={styles.card__detailLabel}>Screen</span>
          <span className={styles.card__detailValue}>{product.screen}</span>
        </div>
        <div className={styles.card__detail}>
          <span className={styles.card__detailLabel}>Capacity</span>
          <span className={styles.card__detailValue}>{product.capacity}</span>
        </div>
        <div className={styles.card__detail}>
          <span className={styles.card__detailLabel}>RAM</span>
          <span className={styles.card__detailValue}>{product.ram}</span>
        </div>
      </div>

      <ProductActions product={product} />
    </article>
  );
};

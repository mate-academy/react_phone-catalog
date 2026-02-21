import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import styles from './ProductCard.module.scss'; // Импортируем стили как объект

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <article className={styles.card}>
      <Link to={`/product/${product.itemId}`} className={styles.imageLink}>
        <img
          src={`/${product.image}`}
          alt={product.name}
          className={styles.image}
        />
      </Link>

      <Link to={`/product/${product.itemId}`} className={styles.title}>
        {product.name}
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.price}>${product.price}</span>

        {product.fullPrice !== product.price && (
          <s className={styles.fullPrice}>${product.fullPrice}</s>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{product.screen}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button
          className={classNames(styles.addToCart, {
            [styles.isSelected]: false,
          })}
        >
          Add to cart
        </button>

        <button className={styles.favorite}>
          <span className="icon">♡</span>
        </button>
      </div>
    </article>
  );
};

import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { ActionButtons } from '../ActionButtons';
import { BASE_URL } from '../../utils/const';

type ProductCardProps = {
  product: Product;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { image, name, fullPrice, price, screen, capacity, ram } = product;

  return (
    <div className={styles.ProductCard}>
      <Link
        to={`/products/${product.itemId}`}
        className={styles.imageContainer}
      >
        <img
          className={styles.image}
          src={`${BASE_URL}/${image}`}
          alt="image"
        />
      </Link>

      <div className={styles.wrapper}>
        <Link to={`/products/${product.itemId}`} className={styles.title}>
          {name}
        </Link>

        <div className={styles.price}>
          <div className={styles.existPrice}>${fullPrice}</div>
          <div className={styles.hotPrice}>${price}</div>
        </div>

        <div className={styles.divider}></div>
        <div className={styles.description}>
          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Screen</p>
            <p className={styles.descriptionText}>{screen}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>Capacity</p>
            <p className={styles.descriptionText}>{capacity}</p>
          </div>

          <div className={styles.existDescription}>
            <p className={styles.descriptionTitle}>RAM</p>
            <p className={styles.descriptionText}>{ram}</p>
          </div>
        </div>
        <ActionButtons product={product} />
      </div>
    </div>
  );
};

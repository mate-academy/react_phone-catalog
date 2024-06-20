import React from 'react';
import styles from './ProductCard.module.scss';
import { BASE_URL } from '../../utils/const';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { ActionButtons } from '../ActionButtons';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { image, name, fullPrice, price, screen, capacity, ram, category } =
    product;

  return (
    <div className={styles.ProductCard}>
      <Link
        to={`/${category}/${product.itemId}`}
        className={styles.imageContainer}
      >
        <img
          className={styles.image}
          src={`${BASE_URL}/${image}`}
          alt="Product"
        />
      </Link>

      <div className={styles.wrapper}>
        <Link to={`/${category}/${product.itemId}`} className={styles.title}>
          {name}
        </Link>

        <div className={styles.price}>
          <div className={styles.hotPrice}>${price}</div>
          <div className={styles.existPrice}>${fullPrice}</div>
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

export default ProductCard;

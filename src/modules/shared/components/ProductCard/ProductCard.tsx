import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { HeartIcon } from '../Icons';
import { Product } from '../../../../types/Product';

interface Props {
  product: Product;
  hasDiscount?: boolean;
}

const ProductSpec: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className={styles.specRow}>
    <span className={styles.specLabel}>{label}</span>
    <span className={styles.specValue}>{value}</span>
  </div>
);

export const ProductCard: React.FC<Props> = ({ product, hasDiscount }) => {
  const { name, fullPrice, price, screen, capacity, ram, image, id, category } =
    product;

  const productPath = `/${category}/${id}`;

  return (
    <article className={styles.card}>
      <Link to={productPath} className={styles.imageLink}>
        <img src={image} alt={name} className={styles.image} />
      </Link>

      <Link to={productPath} className={styles.titleLink}>
        <h3 className={styles.title}>{name}</h3>
      </Link>

      <div className={styles.priceContainer}>
        <span className={styles.price}>${price}</span>
        {hasDiscount && fullPrice !== price && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <ProductSpec label="Screen" value={screen} />
        <ProductSpec label="Capacity" value={capacity} />
        <ProductSpec label="RAM" value={ram} />
      </div>

      <div className={styles.buttons}>
        <button type="button" className={styles.addToCart}>
          Add to cart
        </button>
        <button
          type="button"
          className={styles.favorite}
          aria-label="Add to favorite"
        >
          <HeartIcon />
        </button>
      </div>
    </article>
  );
};

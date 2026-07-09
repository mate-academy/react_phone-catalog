import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../../../types/Product';
import { TechSpecs } from '../TechSpecs';
import { Link } from 'react-router-dom';
import { ActionButtons } from '../ActionButtons';

interface Props {
  product: Product;
  hasDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, hasDiscount }) => {
  const { name, fullPrice, price, image, itemId } = product;
  const productPath = `/product/${itemId}`;

  return (
    <article className={styles.card}>
      <Link to={productPath} className={styles.imageLink}>
        <img src={image} alt={name} className={styles.image} />
      </Link>

      <Link to={`${productPath}`} className={styles.titleLink}>
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
        <TechSpecs product={product} />
      </div>

      <div className={styles.buttons}>
        <ActionButtons product={product} />
      </div>
    </article>
  );
};

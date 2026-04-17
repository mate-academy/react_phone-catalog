import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProductCard.module.scss';

import { ProductType } from '../../types/product.types';
import { getProductPrice } from '../../utils/priceHelper';
import { ProductActions } from '../ProductActions';
import classNames from 'classnames';
import { goTo } from '../../utils/scrollToPosition';

interface ProductCardProps {
  product: ProductType;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
}) => {
  const { id: productId, name, screen, capacity, ram } = product;

  const { oldPrice, currentPrice } = getProductPrice(product);

  const productImage = product.images?.[0] || product.image;

  return (
    <div className={styles.card}>
      <Link
        to={`/${product.category}/${productId}`}
        onClick={goTo}
        className={styles.link}
      >
        <div className={styles.boxIcon}>
          <img
            src={
              productImage
                ? `${import.meta.env.BASE_URL}${productImage}`
                : `${import.meta.env.BASE_URL}img/page-not-found.png`
            }
            alt={name}
            className={styles.icon}
          />
        </div>

        <h4 className={styles.name}>{name}</h4>

        <div className={styles.priceContainer}>
          <span className={styles.newPrice}>{currentPrice}</span>
          {oldPrice && <span className={styles.oldPrice}>{oldPrice}</span>}
        </div>

        <div className={styles.separator} />

        <div className={styles.specs}>
          <div className={styles.specItem}>
            <span className={styles.specKey}>Screen</span>
            <span className={styles.specValue}>{screen}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specKey}>Capacity</span>
            <span className={styles.specValue}>{capacity}</span>
          </div>

          <div className={styles.specItem}>
            <span className={styles.specKey}>RAM</span>
            <span className={styles.specValue}>{ram}</span>
          </div>
        </div>
      </Link>

      <ProductActions
        className={classNames(styles.productActions, className)}
        product={product}
      />
    </div>
  );
};

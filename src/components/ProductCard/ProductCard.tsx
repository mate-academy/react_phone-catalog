import React from 'react';
import styles from './ProductCard.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/ProductType';
import { PaymentsButtons } from '../PaymentsButtons';

interface Props {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, className }) => {
    const location = useLocation();

    const LinkDetails = ({
      children,
      linkClassName,
    }: {
      children: React.ReactNode;
      linkClassName: string;
    }) => {
      return (
        <Link
          to={`/${product.category}/${product.itemId}`}
          state={{ from: location.pathname + location.search }}
          // relative={'path'}
          className={linkClassName}
        >
          {children}
        </Link>
      );
    };

    return (
      <div
        className={`${styles['product-card']} ${className ? className : ''}`}
      >
        <LinkDetails linkClassName={styles['product-card__img-container']}>
          <img src={product.image} className={styles['product-card__img']} />
        </LinkDetails>

        <LinkDetails
          linkClassName={`body-text ${styles['product-card__title']}`}
        >
          {product.name}
        </LinkDetails>

        <div className={styles['product-card__price-row']}>
          <h3 className={styles['product-card__price-current']}>
            ${product.price}
          </h3>

          <h3 className={styles['product-card__price-prev']}>
            ${product.fullPrice}
          </h3>
        </div>

        <hr className={styles['product-card__line']} />

        <div className={styles['product-card__info']}>
          <div className={styles['product-card__info-row']}>
            <p className={`small-text ${styles['product-card__info-name']}`}>
              Screen
            </p>
            <p className={`small-text ${styles['product-card__info-value']}`}>
              {product.screen}
            </p>
          </div>
          <div className={styles['product-card__info-row']}>
            <p className={`small-text ${styles['product-card__info-name']}`}>
              Capacity
            </p>
            <p className={`small-text ${styles['product-card__info-value']}`}>
              {product.capacity}
            </p>
          </div>
          <div className={styles['product-card__info-row']}>
            <p className={`small-text ${styles['product-card__info-name']}`}>
              RAM
            </p>
            <p className={`small-text ${styles['product-card__info-value']}`}>
              {product.ram}
            </p>
          </div>
        </div>

        <PaymentsButtons product={product.itemId} />
      </div>
    );
  },
);

ProductCard.displayName = 'ProductCard';

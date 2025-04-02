import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { AddAndLikeButtons } from '../AddAndLikeButtons';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
  isProductDetails?: boolean;
  hot?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  isProductDetails,
  hot,
}) => {
  const { itemId, image, name, price, fullPrice, screen, capacity, ram } =
    product;

  const specs = [
    { name: 'Screen', value: screen },
    { name: 'Сapacity', value: capacity },
    { name: 'RAM', value: ram },
  ];

  const handleScrollTo = () => {
    if (isProductDetails) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={styles['product-card']}>
      <Link
        className={styles['product-card__link']}
        to={`/product/${itemId}`}
        onClick={handleScrollTo}
      >
        <img
          className={styles['product-card__img']}
          src={image}
          alt={`${name} img`}
        />
        <p className={styles['product-card__name']}>{name}</p>
      </Link>
      <div className={styles['product-card__price']}>
        <p className={styles['product-card__price--new']}>{'$' + price}</p>
        {hot && (
          <p className={styles['product-card__price--old']}>
            {'$' + fullPrice}
          </p>
        )}
      </div>

      <div className={styles['product-card__specs']}>
        {specs.map((spec, i) => (
          <div
            key={i}
            className={`${styles['product-card__spec']} ${styles.spec}`}
          >
            <p className={styles.spec__name}>{spec.name}</p>
            <p className={styles.spec__value}>{spec.value}</p>
          </div>
        ))}
      </div>
      <AddAndLikeButtons product={product} />
    </div>
  );
};

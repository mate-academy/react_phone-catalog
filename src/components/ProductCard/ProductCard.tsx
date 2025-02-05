import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { image, name, price, screen, capacity, ram } = product;
  const specs = [
    { name: 'Screen', value: screen },
    { name: 'Сapacity', value: capacity },
    { name: 'RAM', value: ram },
  ];

  return (
    <div className={styles['product-card']}>
      <img className={styles['product-card__img']} src={image} />
      <p className={styles['product-card__name']}>{name}</p>
      <p className={styles['product-card__price']}>{'$' + price}</p>
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
      <div className={styles['product-card__buttons']}>
        <button
          className={`${styles['product-card__button']} ${styles['product-card__button--add']}`}
        >
          Add to cart
        </button>
        <button
          className={`${styles['product-card__button']} ${styles['product-card__button--like']}`}
        ></button>
      </div>
    </div>
  );
};

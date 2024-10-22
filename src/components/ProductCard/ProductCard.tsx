import styles from './ProductCard.module.scss';
import React from 'react';
import { Products } from '../../utils/types';
import { ToBuyButton } from '../ToBuyButton';
import { AddToFavourites } from '../AddToFavourites';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';

type Props = {
  product: Products;
  width?: number;
};

export const ProductCard: React.FC<Props> = ({ product, width }) => {
  const { image, name, fullPrice, price, screen, capacity, ram } = product;

  return (
    <article className={styles.productCard} style={{ minWidth: `${width}px` }}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productCard__imagewrapper}
      >
        <img
          className={styles.productCard__image}
          src={`${BASE_URL}/${image}`}
          alt={name}
        />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        className={styles.productCard__title}
      >
        {name}
      </Link>
      <div className={styles.productCard__prices}>
        <p className={styles.productCard__fullprice}>{`$${fullPrice}`}</p>
        <p className={styles.productCard__price}>{price}</p>
      </div>
      <div className={styles.productCard__line}></div>
      <div className={styles['productCard__features-wrapper']}>
        <div className={styles.productCard__features}>
          <p className={styles.productCard__feature}>Screen</p>
          <p className={styles['productCard__feature-value']}>{screen}</p>
        </div>
        <div className={styles.productCard__features}>
          <p className={styles.productCard__feature}>Capacity</p>
          <p className={styles['productCard__feature-value']}>{capacity}</p>
        </div>
        <div className={styles.productCard__features}>
          <p className={styles.productCard__feature}>RAM</p>
          <p className={styles['productCard__feature-value']}>{ram}</p>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <ToBuyButton height="40" product={product} />
        <AddToFavourites size="s" product={product} />
      </div>
    </article>
  );
};

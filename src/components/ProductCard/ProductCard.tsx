import styles from './ProductCard.module.scss';

import React from 'react';
import { Products } from '../../utils/types';
import { ToBuyButton } from '../ToBuyButton';
import { AddToFavourites } from '../AddToFavourites';

type Props = {
  product: Products;
  width: number;
};
export const ProductCard: React.FC<Props> = ({ product, width }) => {
  const { image, name, fullPrice, price, screen, capacity, ram } = product;

  return (
    <article className={styles.productCard} style={{ minWidth: `${width}px` }}>
      <a href="#" className={styles.productCard__imagewrapper}>
        <img className={styles.productCard__image} src={image} alt={name} />
      </a>
      <p className={styles.productCard__title}>{name}</p>
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
        <ToBuyButton height="40" />
        <AddToFavourites size="s" />
      </div>
    </article>
  );
};

import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../../types/Product';

type Props = {
  good: Product;
  style: { [key: string]: string };
  isFullPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({ good, style, isFullPrice }) => {
  const { name, image, price, screen, capacity, ram, fullPrice } = good;

  return (
    <div className={styles.card} style={style}>
      <div className={styles.card__content}>
        <img src={image} alt={name} className={styles.card__img} />

        <div className={styles.card__mainInfo}>
          <p className={styles.card__title}>{name}</p>
          <p className={styles.card__price}>
            {price}
            {isFullPrice && (
              <span className={styles.card__fullPrice}>{fullPrice}</span>
            )}
          </p>
        </div>

        <div className={styles.card__secondaryInfo}>
          <p className={styles.card__secondaryInfoText}>
            Screen <span>{screen}</span>
          </p>

          <p className={styles.card__secondaryInfoText}>
            Capacity <span>{capacity}</span>
          </p>

          <p className={styles.card__secondaryInfoText}>
            RAM <span>{ram}</span>
          </p>
        </div>

        <div className={styles.card__buttons}>
          <button className={styles.card__buttonAdd}>Add to cart</button>
          <button className={styles.card__buttonLike} />
        </div>
      </div>
    </div>
  );
};

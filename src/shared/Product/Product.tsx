import React from 'react';
import styles from './Product.module.scss';
import { ProductType } from '../../types/ProductType';

type Props = {
  product: ProductType;
  fullPriceActive: boolean;
};

export const Product: React.FC<Props> = ({ product, fullPriceActive }) => {
  const { name, price, fullPrice, image, screen, capacity, ram } = product;

  return (
    <article className={styles.product}>
      <div className={styles.product__content}>
        <div className={styles.product__img}>
          <img src={image} alt={name} />
        </div>

        <h3 className={styles.product__title}>{name}</h3>

        <div className={styles.product__prices}>
          <span className={styles.product__price}>{`$${price}`}</span>

          {fullPriceActive && (
            <span className={styles.product__fullPrice}>{`$${fullPrice}`}</span>
          )}
        </div>

        <div className={styles.product__line} />

        <div className={styles.product__info}>
          <div className={styles.product__infoRow}>
            <span className={styles.product__infoTitle}>Screen</span>
            <span className={styles.product__infoValue}>{screen}</span>
          </div>
          <div className={styles.product__infoRow}>
            <span className={styles.product__infoTitle}>Capacity</span>
            <span className={styles.product__infoValue}>{capacity}</span>
          </div>
          <div className={styles.product__infoRow}>
            <span className={styles.product__infoTitle}>RAM</span>
            <span className={styles.product__infoValue}>{ram}</span>
          </div>
        </div>

        <div className={styles.product__buttons}>
          <button className={styles.product__addToCart}>Add to cart</button>
          <button type="button" className={styles.product__like}>
            <img src="img/icons/favorites.svg" alt="Add to favorites" />
          </button>
        </div>
      </div>
    </article>
  );
};

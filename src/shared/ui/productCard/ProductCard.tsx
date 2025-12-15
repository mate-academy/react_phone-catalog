import React from 'react';
import { Product } from '../../types/Product';
import { AddToCart } from '../buttons/addToCart';
import { AddToFavoriteButton } from '../buttons/addToFavorite';
import styles from './ProductCard.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showFullPrice = false,
}) => {
  return (
    <div className={styles.productCard}>
      <NavLink
        to={`/${product.category}/${product.itemId}`}
        className={styles.topBlock}
      >
        <img
          className={styles.img}
          src={product.image}
          alt={product.name}
        ></img>
        <p className={`body-text ${styles.productName}`}>{product.name}</p>
      </NavLink>
      <div className={styles.priceBlock}>
        <h3 className={styles.price}>{`$${product.price}`}</h3>
        {showFullPrice && (
          <div className={styles.fullPriceWrapper}>
            <span className={styles.fullPrice}>{`$${product.fullPrice}`}</span>
            <span className={styles.strike}></span>
          </div>
        )}
      </div>

      <div className={`small-text ${styles.infoBlock}`}>
        <div className={styles.infoText}>
          <p className={styles.title}>Screen</p>
          <p className={styles.specs}>{product.screen}</p>
        </div>
        <div className={styles.infoText}>
          <p className={styles.title}>Capacity</p>
          <p className={styles.specs}>{product.capacity}</p>
        </div>
        <div className={styles.infoText}>
          <p className={styles.title}>RAM</p>
          <p className={styles.specs}>{product.ram}</p>
        </div>
      </div>
      <div className={styles.buttonBlock}>
        <AddToCart product={product} />
        <AddToFavoriteButton product={product} />
      </div>
    </div>
  );
};

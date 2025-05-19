import React from 'react';
import styles from './ProductCard.module.scss';
import { AppButton } from '../appButton';
import { Products } from '../../../../types/Products';

type Props = {
  product: Products;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.name} className={styles.cardImg} />

      <p className={styles.productName}>{product.name}</p>

      <div className={styles.priceContainer}>
        <p className={styles.discountPrice}>{`$${product.price}`}</p>

        {product.fullPrice !== product.price && (
          <p className={styles.price}>{`$${product.fullPrice}`}</p>
        )}
      </div>

      <div className={styles.line} />

      <ul className={styles.list}>
        <li className={styles.listItem}>
          <p className={`${styles.productData}`}>Screen</p>
          <p className={`${styles.productData}`}>{product.screen}</p>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.productData}`}>Capacity</p>
          <p className={`${styles.productData}`}>{product.capacity}</p>
        </li>
        <li className={styles.listItem}>
          <p className={`${styles.productData}`}>RAM</p>
          <p className={`${styles.productData}`}>{product.ram}</p>
        </li>
      </ul>

      <div className={styles.buttons}>
        <button className={styles.addToCartButton}>Add to cart</button>
        <AppButton
          className={styles.favoriteButton}
          src={'img/icons/favourites.svg'}
          buttonName={'Add to fovourites'}
        />
      </div>
    </div>
  );
};

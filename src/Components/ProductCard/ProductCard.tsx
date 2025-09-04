import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isFav, setIsFav] = useState(false);
  const [isProduct, setIsProduct] = useState(false);

  const toggleProduct = () => {
    setIsProduct(prev => !prev);
  };

  const toggleFav = () => {
    setIsFav(prev => !prev);
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} className={styles.image} />

      <h3 className={styles.title}>{product.name}</h3>

      <div className={styles.prices}>
        <span className={styles.price}>${product.price}</span>
        <span className={styles.fullPrice}>${product.fullPrice}</span>
      </div>

      <ul className={styles.details}>
        <li>
          <strong>Screen:</strong> {product.screen}
        </li>
        <li>
          <strong>Capacity:</strong> {product.capacity}
        </li>
        <li>
          <strong>RAM:</strong> {product.ram}
        </li>
      </ul>

      <div className={styles.actions}>
        <button
          className={`${styles.addToCart} ${isProduct ? styles.addToCartActive : ''}`}
          onClick={toggleProduct}
        >
          {isProduct ? 'Added to cart' : 'Add to cart'}
        </button>
        <div
          className={`${styles.fav} ${isFav ? styles.favActive : ''}`}
          onClick={toggleFav}
        ></div>
      </div>
    </div>
  );
};

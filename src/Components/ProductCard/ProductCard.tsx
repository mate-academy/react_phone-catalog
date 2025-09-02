import React from 'react';
import styles from './ProductCard.module.scss';

type Product = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  capacity: string;
  fullPrice: number;
  price: number;
  color: string;
  image: string;
  screen: string;
  ram: string;
  year: number;
};

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
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
        <button className={styles.addToCart}>Add to cart</button>
        <div className={styles.fav}></div>
      </div>
    </div>
  );
};

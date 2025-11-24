import React from 'react';
import styles from './ProductsList.module.scss';

type Product = {
  id: number;
  name: string;
  price: number;
  discount: number;
  year: number;
  image?: string;
};

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.list}>
      {products.map(product => (
        <div key={product.id} className={styles.card}>
          <img
            src={
              product.image || 'https://via.placeholder.com/150x150?text=Phone'
            }
            alt={product.name}
            className={styles.image}
          />
          <h3 className={styles.title}>{product.name}</h3>
          <p className={styles.price}>
            ${(product.price - product.discount).toFixed(2)}{' '}
            <span className={styles.oldPrice}>${product.price}</span>
          </p>
          <p className={styles.year}>Year: {product.year}</p>
        </div>
      ))}
    </div>
  );
};

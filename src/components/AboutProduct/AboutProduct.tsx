import React from 'react';
import styles from './AboutProduct.module.scss';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const AboutProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.aboutProduct}>
      <h2 className={styles.aboutProduct__title}>About</h2>
      <ul className={styles.aboutProduct__list}>
        {product.description.map(d => (
          <li key={d.title} className={styles.aboutProduct__item}>
            <span className={styles.aboutProduct__name}>{d.title}</span>

            <p className={styles.aboutProduct__description}>{d.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

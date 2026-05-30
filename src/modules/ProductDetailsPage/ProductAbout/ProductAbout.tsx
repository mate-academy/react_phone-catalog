import React from 'react';
import { ProductDetails } from '../../shared/types/ProductDetails';
import styles from './ProductAbout.module.scss';

type Props = {
  productDetails: ProductDetails;
};

export const ProductAbout: React.FC<Props> = ({ productDetails }) => {
  return (
    <div className={styles.about}>
      <h3 className={styles.about__title}>About</h3>
      <ul className={styles.about__list}>
        {productDetails.description.map(product => (
          <li key={product.title} className={styles.about__item}>
            <h4 className={styles['about__item-title']}>{product.title}</h4>

            <p className={styles['about__item-desc']}>{product.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

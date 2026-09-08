import React from 'react';
import styles from './About.module.scss';
import { ProductType } from '../../../types/ProductType';

type Props = {
  product: ProductType;
};

export const AboutProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.about}>
      <h3 className={styles.about__title}>About</h3>
      <div className={styles.about__content}>
        {product.description.map((item, index) => (
          <div key={index} className={styles.about__item}>
            <h4 className={styles.about__subtitle}>{item.title}</h4>
            <p className={styles.about__text}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

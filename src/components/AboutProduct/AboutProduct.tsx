import styles from './AboutProduct.module.scss';
import { Title } from '../Title';
import React from 'react';
import { Product, ProductDescription } from '../../utils/types';

type Props = {
  product: Product;
};

export const AboutProduct: React.FC<Props> = ({ product }) => {
  return (
    <div className={styles.aboutProduct}>
      <div className={styles.aboutProduct__title}>
        <Title level={3}>About</Title>
      </div>
      {product.description.map((desc: ProductDescription, index) => {
        return (
          <section className={styles.aboutProduct__description} key={index + 1}>
            <div className={styles.aboutProduct__subtitle}>
              <Title level={4}>{desc.title}</Title>
            </div>
            <div className={styles.aboutProduct__text}>{desc.text}</div>
          </section>
        );
      })}
    </div>
  );
};

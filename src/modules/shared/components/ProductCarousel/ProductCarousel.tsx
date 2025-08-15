import React from 'react';
import '@/styles/main.scss';
import { ProductCard } from '../ProductCard';
import styles from './ProductCarousel.module.scss';

interface Props {
  title: string;
}

export const ProductCarousel: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.product_carousel}>
      <div className={styles.product_carousel__controls}>
        <h2>{title}</h2>
        <div className={styles['product_carousel__controls--buttons']}>
          <button className="button__circle button__circle--arrow">
            <i className="icon icon--left"></i>
          </button>
          <button className="button__circle button__circle--arrow">
            <i className="icon icon--right"></i>
          </button>
        </div>
      </div>
      <div className={styles.product_carousel__products}>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
      </div>
    </div>
  );
};

import React from 'react';
import { Product } from '../../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './Slider.module.scss';

type Props = {
  products: Product[];
  current: number;
};

export const Slider: React.FC<Props> = ({ products, current }) => {
  return (
    <div className={styles.slider}>
      <div
        className={styles.slider__slides}
        style={{ transform: `translateX(-${current * 202 + 16}px)` }}
      >
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

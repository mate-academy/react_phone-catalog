import React from 'react';
import { Product } from '../../../shared/types/index';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
  isSlider?: boolean;
}

export const ProductsList: React.FC<Props> = ({
  products,
  isSlider = false,
}) => {
  if (!products.length) {
    return <div className={styles.empty}>No products available</div>;
  }

  return (
    <div
      className={`${styles.productGrid} ${isSlider ? styles.sliderMode : ''}`}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

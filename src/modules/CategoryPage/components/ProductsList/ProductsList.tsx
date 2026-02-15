import React from 'react';
import { Product } from '../../../shared/types/index';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsList.module.scss';

interface Props {
  products: Product[];
  isSlider?: boolean;
  slidesPerView: number;
}

export const ProductsList: React.FC<Props> = ({
  products,
  isSlider = false,
  slidesPerView = 4,
}) => {
  if (!products.length) {
    return <div className={styles.empty}>No products available</div>;
  }

  const cols = isSlider ? slidesPerView : 4;

  return (
    <div
      className={`${styles.productGrid} ${isSlider ? styles.sliderMode : ''}`}
      style={
        {
          '--cols': cols,
        } as React.CSSProperties
      }
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

// src/modules/HomePage/components/ProductsSlider.tsx
import React, { useRef } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../../types/Product';
import { ProductCard } from '../../../components/ProductCard';

interface ProductsSliderProps {
  products: Product[];
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <button className={styles.navButton} onClick={scrollPrev}>
        &lt;
      </button>
      <div className={styles.slider} ref={sliderRef}>
        {products.map(product => (
          <div key={product.id} className={styles.item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <button className={styles.navButton} onClick={scrollNext}>
        &gt;
      </button>
    </div>
  );
};

export default ProductsSlider;

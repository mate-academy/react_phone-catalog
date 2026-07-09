import React, { useRef } from 'react';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  products,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.productsSlider}>
      <h2>{title}</h2>
      <div className={styles.sliderContainer}>
        <button className={styles.prevButton} onClick={scrollLeft}>
          ‹
        </button>
        <div className={styles.slider} ref={sliderRef}>
          {products.map(product => (
            <div key={product.id} className={styles.productItem}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button className={styles.nextButton} onClick={scrollRight}>
          ›
        </button>
      </div>
    </section>
  );
};

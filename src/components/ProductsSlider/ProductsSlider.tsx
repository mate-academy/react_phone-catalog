import React, { useEffect, useState } from 'react';

import styles from './ProductsSlider.module.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

interface ProductsSliderProps {
  products: Product[];
  title: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  products,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w >= 1200) {
        setVisibleCards(4);
      } else if (w >= 840) {
        setVisibleCards(3);
      } else if (w >= 600) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [products.length, visibleCards]);

  const maxIndex = Math.max(0, products.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className={styles.sliderContainer} data-testid="products-slider">
      <div className={styles.header}>
        <h2 className={styles.title}>
          {title} {products.length > 0 ? `(${products.length})` : ''}
        </h2>
        <div className={styles.buttons}>
          <button
            type="button"
            className={`${styles.btn} ${currentIndex === 0 ? styles.disabled : ''}`}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous products"
          >
            <i className="fa-solid fa-chevron-left" />
          </button>

          <button
            type="button"
            className={`${styles.btn} ${currentIndex >= maxIndex ? styles.disabled : ''}`}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next products"
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(calc(-${currentIndex} * (100% + 16px) / ${visibleCards}))`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.slideItem}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

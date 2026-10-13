import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Each card is 272px wide + 16px gap = 288px
  const CARD_STEP = 288;
  const maxIndex = Math.max(0, products.length - 1);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.sliderContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={styles.navButton}
            aria-label="Previous products"
          >
            <i className="fas fa-chevron-left" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={styles.navButton}
            aria-label="Next products"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>

      <div className={styles.trackWrapper}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${currentIndex * CARD_STEP}px)`,
          }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

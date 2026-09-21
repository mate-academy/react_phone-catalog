import React, { useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [position, setPosition] = useState(0);

  const cardWidth = 272 + 16;
  const maxPosition = Math.max(0, products.length - 4);

  const handlePrev = () => {
    setPosition(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setPosition(prev => Math.min(maxPosition, prev + 1));
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={position === 0}
            className={styles.button}
            aria-label="Previous items"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={position >= maxPosition}
            className={styles.button}
            aria-label="Next items"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.carousel}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${position * cardWidth}px)`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.cardItem}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

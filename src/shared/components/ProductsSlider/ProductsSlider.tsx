import React, { useState } from 'react';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE_CARDS = 4;

  const maxIndex = Math.max(0, products.length - VISIBLE_CARDS);

  const handleNext = () => {
    if (startIndex < maxIndex) {
      setStartIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  return (
    <div className={styles.productsSlider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <img
              src="img/icons/Chevron (Arrow Right).svg"
              alt="Previous"
              className={styles.arrowLeft}
            />
          </button>

          <button
            type="button"
            className={styles.button}
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
          >
            <img
              src="img/icons/Chevron (Arrow Right).svg"
              alt="Next"
              className={styles.arrowRight}
            />
          </button>
        </div>
      </div>

      <div className={styles.sliderWrapper}>
        <div
          className={styles.cardsContainer}
          style={{
            transform: `translateX(-${startIndex * (272 + 16)}px)`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

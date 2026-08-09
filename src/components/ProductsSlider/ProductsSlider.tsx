/* eslint-disable prettier/prettier */
import { useState } from 'react';

import styles from './ProductsSlider.module.scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCards = 4;
  const maxIndex = Math.max(products.length - visibleCards, 0);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>

          <button
            type="button"
            className={styles.button}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            &#10095;
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.products}
          style={{
            transform: `translateX(calc(-${currentIndex} * (272px + 16px)))`,
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

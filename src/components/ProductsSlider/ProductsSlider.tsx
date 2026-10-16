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

  // Кількість видимих карток за один раз (для простоти розрахунку зсуву)
  const cardWidth = 272; // Ширина картки + gap
  const frameSize = 4; // Скільки карток видно за раз на десктопі

  const maxIndex = Math.max(0, products.length - frameSize);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={styles.btn}
            aria-label="Previous products"
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={styles.btn}
            aria-label="Next products"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className={styles.sliderWindow}>
        <div
          className={styles.sliderList}
          style={{
            transform: `translateX(-${currentIndex * cardWidth}px)`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

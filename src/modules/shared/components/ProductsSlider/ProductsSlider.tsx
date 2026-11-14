import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  showFullPrice?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showFullPrice = true,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 4;
  const maxIndex = Math.max(0, products.length - visibleCards);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const step = 'calc(var(--card-width) + 16px)';
  const trackTransform = `translateX(calc(-${startIndex} * ${step}))`;

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={styles.slider__btn}
            aria-label="Previous products"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={startIndex >= maxIndex}
            className={styles.slider__btn}
            aria-label="Next products"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.slider__viewport}>
        <div
          className={styles.slider__track}
          style={{ transform: trackTransform }}
        >
          {products.map((product) => (
            <div key={product.id} className={styles.slider__item}>
              <ProductCard product={product} showFullPrice={showFullPrice} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

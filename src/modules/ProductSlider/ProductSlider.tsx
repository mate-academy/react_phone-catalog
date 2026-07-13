import React, { useEffect, useRef, useState } from 'react';

import { ProductCard } from '../ProductCard';

import styles from './ProductSlider.styles.module.scss';

import ArrowLeft from '../../assets/icons/VectorLeft.svg?react';
import ArrowRight from '../../assets/icons/VectorRight.svg?react';
import { Product } from '../../types/Products';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideStep, setSlideStep] = useState(0);

  const firstProductRef = useRef<HTMLDivElement | null>(null);

  const visibleCards = 4;
  const maxSlide = Math.max(0, products.length - visibleCards);

  useEffect(() => {
    if (!firstProductRef.current) {
      return;
    }

    const cardWidth = firstProductRef.current.offsetWidth;
    const gap = 16;

    setSlideStep(cardWidth + gap);
  }, [products]);

  const handleRight = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlide));
  };

  const handleLeft = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowLeft}
            onClick={handleLeft}
            disabled={currentSlide === 0}
          >
            <ArrowLeft />
          </button>

          <button
            type="button"
            className={styles.arrowRight}
            onClick={handleRight}
            disabled={currentSlide === maxSlide}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className={styles.viewport}>
        <div
          className={styles.products}
          style={{
            transform: `translateX(-${currentSlide * slideStep}px)`,
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={index === 0 ? firstProductRef : null}
              className={styles.product}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

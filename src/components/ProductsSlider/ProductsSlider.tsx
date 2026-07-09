import React, { useState, useRef, useEffect } from 'react';
import styles from './ProductsSlider.module.scss';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [offset, setOffset] = useState(0);
  const [cardWidth, setCardWidth] = useState(272);
  const trackRef = useRef<HTMLDivElement>(null);

  const gap = 16;
  const step = cardWidth + gap;
  const maxOffset = Math.max(0, (products.length - 1) * step - step * 3);

  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setCardWidth(272);
      } else if (width >= 640) {
        setCardWidth(237);
      } else {
        setCardWidth(212);
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);

    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

  const handlePrev = () => {
    setOffset(prev => Math.max(0, prev - step));
  };

  const handleNext = () => {
    setOffset(prev => Math.min(maxOffset, prev + step));
  };

  return (
    <div className={styles.slider}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.button}
            onClick={handlePrev}
            disabled={offset === 0}
          >
            <img src="/img/icons/arrow-left.svg" alt="Previous" />
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={handleNext}
            disabled={offset >= maxOffset}
          >
            <img src="/img/icons/arrow-right.svg" alt="Next" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className={styles.track}
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {products.map(product => (
          <div key={product.id} className={styles.card}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

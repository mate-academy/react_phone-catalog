import React, { useRef } from 'react';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 12L6 8l4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 12l4-4-4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface Props {
  title: string;
  products: Product[];
  showDiscount?: boolean;
}

const SCROLL_STEP = 288 * 2;

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showDiscount = true,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <IconChevronLeft />
          </button>

          <button
            className={styles.btn}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <IconChevronRight />
          </button>
        </div>
      </div>

      <div className={styles.trackOuter}>
        <div className={styles.track} ref={trackRef}>
          {products.map(p => (
            <div key={p.id} className={styles.item}>
              <ProductCard product={p} showDiscount={showDiscount} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useRef } from 'react';
import type { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import { Icon } from '../Icon';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

const SCROLL_STEP = 320;

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
          >
            <Icon name="chevron-left" />
          </button>
          <button
            type="button"
            className={styles.navButton}
            aria-label="Scroll right"
            onClick={() => scroll(1)}
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {products.map(product => (
          <div className={styles.item} key={product.itemId}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

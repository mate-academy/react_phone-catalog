import React, { useRef } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
  hasDiscount?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  hasDiscount = true,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.75;

      sliderRef.current.scrollTo({
        left:
          direction === 'left'
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.sliderContainer} ref={sliderRef}>
        {products.map(product => (
          <div key={product.id} className={styles.slideItem}>
            <ProductCard product={product} hasDiscount={hasDiscount} />
          </div>
        ))}
      </div>
    </section>
  );
};

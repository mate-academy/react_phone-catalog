import { useRef } from 'react';

import type { Product } from '../../shared/types';

import ProductCard from '../ProductCard';

import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  navigate: (to: string) => void;
  showDiscount?: boolean;
};

export default function ProductsSlider({
  title,
  products,
  navigate,
  showDiscount = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: number) => {
    containerRef.current?.scrollBy({
      left: direction * 320,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>

        <div className={styles.controls}>
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => scroll(-1)}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next products"
            onClick={() => scroll(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.viewport} ref={containerRef}>
        <div className={styles.track}>
          {products.map(product => (
            <div className={styles.item} key={product.id}>
              <ProductCard
                product={product}
                navigate={navigate}
                showDiscount={showDiscount}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import type { Product } from '../../shared/types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';
export function ProductsSlider({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (direction: number) =>
    ref.current?.scrollBy({
      left: direction * (ref.current.clientWidth * 0.85),
      behavior: 'smooth',
    });

  if (!products.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>{title}</h2>
        <div>
          <button onClick={() => scroll(-1)} aria-label="Previous products">
            ‹
          </button>
          <button onClick={() => scroll(1)} aria-label="Next products">
            ›
          </button>
        </div>
      </div>
      <div className={styles.track} ref={ref}>
        {products.map(product => (
          <div className={styles.slide} key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

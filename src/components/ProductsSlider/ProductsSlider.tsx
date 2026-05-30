import { useRef } from 'react';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

export const ProductsSlider = ({
  products,
  title,
}: {
  products: Product[];
  title: string;
}) => {
  const slider = useRef<HTMLDivElement | null>(null);

  const scrollBy = (direction: 'left' | 'right') => {
    slider.current?.scrollBy({
      left: direction === 'right' ? 460 : -460,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.sliderSection}>
      <div className={styles.headingRow}>
        <h3>{title}</h3>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={() => scrollBy('left')}
            aria-label="Scroll left"
          >
            <span className="fa fa-chevron-left" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy('right')}
            aria-label="Scroll right"
          >
            <span className="fa fa-chevron-right" />
          </button>
        </div>
      </div>
      <div className={styles.track} ref={slider}>
        {products.map(product => (
          <div key={product.id} className={styles.productItem}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

import { useRef } from 'react';
import { ProductCard } from '../../../../shared/ProductCard';
import { Product } from '../../../../api/types';
import styles from './ProductsSlider.module.scss';

interface ProductsSliderProps {
  title?: string;
  products: Product[];
}

export const ProductsSlider = ({ title, products }: ProductsSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByDirection = (direction: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.slider}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.track} ref={trackRef}>
        {products.map(product => (
          <div key={product.id} className={styles.slide}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className={styles.arrows}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByDirection(-1)}
          aria-label="Scroll products left"
        >
          <i className="fas fa-chevron-left" />
        </button>
        <button
          type="button"
          className={styles.arrowNext}
          onClick={() => scrollByDirection(1)}
          aria-label="Scroll products right"
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </section>
  );
};

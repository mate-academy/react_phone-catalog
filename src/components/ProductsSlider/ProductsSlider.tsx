import { useRef } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
  hideDiscount?: boolean;
};

export const ProductsSlider = ({
  title,
  products,
  hideDiscount = false,
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'prev' | 'next') => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const cardWidth = track.firstElementChild
      ? (track.firstElementChild as HTMLElement).offsetWidth + 16
      : 220;

    track.scrollBy({
      left: direction === 'next' ? cardWidth * 2 : -cardWidth * 2,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>

        <div className={styles.arrows}>
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => scroll('prev')}
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Next products"
            onClick={() => scroll('next')}
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.track} ref={trackRef}>
        {products.map(product => (
          <div key={product.id} className={styles.slide}>
            <ProductCard product={product} hideDiscount={hideDiscount} />
          </div>
        ))}
      </div>
    </section>
  );
};

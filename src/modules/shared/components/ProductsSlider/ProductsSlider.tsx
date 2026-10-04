import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import { Icon } from '../Icon';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider = ({ title, products }: Props) => {
  const titleId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setCanScrollPrev(track.scrollLeft > 1);
    setCanScrollNext(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    updateScrollState();

    const observer = new ResizeObserver(updateScrollState);

    observer.observe(track);

    return () => observer.disconnect();
  }, [products, updateScrollState]);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstItem = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = (firstItem?.offsetWidth ?? track.clientWidth) + gap;

    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby={titleId}>
      <div className={styles.header}>
        <h2 id={titleId}>{title}</h2>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous products"
            disabled={!canScrollPrev}
            onClick={() => scroll(-1)}
          >
            <Icon name="chevron-left" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next products"
            disabled={!canScrollNext}
            onClick={() => scroll(1)}
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      </div>

      <ul ref={trackRef} className={styles.track} onScroll={updateScrollState}>
        {products.map(product => (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

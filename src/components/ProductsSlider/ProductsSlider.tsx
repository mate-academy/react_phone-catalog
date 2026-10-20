import { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ prev: false, next: true });

  const updateCanScroll = () => {
    const track = sliderRef.current;

    if (track) {
      setCanScroll({
        prev: track.scrollLeft > 0,
        next: track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
      });
    }
  };

  useEffect(() => {
    updateCanScroll();
    window.addEventListener('resize', updateCanScroll);

    return () => window.removeEventListener('resize', updateCanScroll);
  }, [products]);

  const scroll = (direction: 1 | -1) => {
    const track = sliderRef.current;
    const item = track?.children[0] as HTMLElement | undefined;

    if (track && item) {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

      track.scrollBy({ left: direction * (item.offsetWidth + gap) });
    }
  };

  if (!products.length) {
    return null;
  }

  return (
    <div className={styles.slider} data-cy="ProductsSlider">
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__actions}>
          <button
            className={styles.slider__btn}
            onClick={() => scroll(-1)}
            disabled={!canScroll.prev}
            aria-label="Previous"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className={styles.slider__btn}
            onClick={() => scroll(1)}
            disabled={!canScroll.next}
            aria-label="Next"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div
        className={styles.slider__track}
        ref={sliderRef}
        onScroll={updateCanScroll}
      >
        {products.map(product => (
          <div key={product.id} className={styles.slider__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

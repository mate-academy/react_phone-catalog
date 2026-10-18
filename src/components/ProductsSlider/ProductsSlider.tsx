import { useCallback, useEffect, useRef, useState } from 'react';
import { Product } from '../../types';
import { Icon } from '../Icon';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

interface Props {
  title: string;
  products: Product[];
}

export const ProductsSlider = ({ title, products }: Props) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setCanScrollBack(track.scrollLeft > 0);
    setCanScrollForward(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);

    return () => window.removeEventListener('resize', updateScrollState);
  }, [products, updateScrollState]);

  const scroll = (direction: 1 | -1) => {
    const track = trackRef.current;

    track?.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles['products-slider']}>
      <div className={styles['products-slider__header']}>
        <h2 className={styles['products-slider__title']}>{title}</h2>

        <div className={styles['products-slider__controls']}>
          <button
            type="button"
            className={styles['products-slider__button']}
            disabled={!canScrollBack}
            aria-label="Previous products"
            onClick={() => scroll(-1)}
          >
            <Icon name="arrow-left" />
          </button>
          <button
            type="button"
            className={styles['products-slider__button']}
            disabled={!canScrollForward}
            aria-label="Next products"
            onClick={() => scroll(1)}
          >
            <Icon name="arrow-right" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className={styles['products-slider__track']}
        onScroll={updateScrollState}
      >
        {products.map(product => (
          <li key={product.id} className={styles['products-slider__item']}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};

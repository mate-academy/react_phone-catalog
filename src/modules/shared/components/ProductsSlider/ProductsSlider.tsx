import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../../../types/Product';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
  hideDiscount?: boolean;
};

const GAP = 16;

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  hideDiscount,
}) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setMaxScroll(track.scrollWidth - track.clientWidth);
  }, [products]);

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    setScrollLeft(event.currentTarget.scrollLeft);
  };

  const scrollTrack = (direction: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const item = track.children[0] as HTMLElement;
    const step = item.offsetWidth + GAP;

    track.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  const isStart = scrollLeft <= 0;
  const isEnd = scrollLeft >= maxScroll - 1;

  return (
    <section className={styles.productsSlider}>
      <div className={styles.productsSliderHeader}>
        <h2 className={styles.productsSliderTitle}>{title}</h2>
        <div className={styles.productsSliderButtons}>
          <button
            type="button"
            aria-label="Previous products"
            className={styles.productsSliderButton}
            onClick={() => scrollTrack(-1)}
            disabled={isStart}
          >
            <span className={styles.productsSliderIconPrev} />
          </button>

          <button
            type="button"
            aria-label="Next products"
            className={styles.productsSliderButton}
            onClick={() => scrollTrack(1)}
            disabled={isEnd}
          >
            <span className={styles.productsSliderIconNext} />
          </button>
        </div>
      </div>
      <ul
        ref={trackRef}
        className={styles.productsSliderTrack}
        onScroll={handleScroll}
      >
        {products.map(product => (
          <li key={product.id} className={styles.productsSliderItem}>
            <ProductCard product={product} hideDiscount={hideDiscount} />
          </li>
        ))}
      </ul>
    </section>
  );
};

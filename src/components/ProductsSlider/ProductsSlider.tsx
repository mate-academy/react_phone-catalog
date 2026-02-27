import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { ArrowLeftIcon } from '../ui/ArrowLeftIcon';

import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';
import { CatalogProducts } from '../../types/ProductTypes';

interface ProductSliderProps {
  title: string;
  products: CatalogProducts[];
}

export const ProductsSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const listRef = useRef<HTMLDivElement>(null);

  const checkScrollPosition = useCallback(() => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  }, []);

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);

    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [checkScrollPosition]);

  const getScrollStep = () => {
    const width = window.innerWidth;

    if (width < 640) {
      return 212 + 16;
    }

    if (width < 1200) {
      return 237 + 16;
    }

    return 272 + 16;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (listRef.current) {
      const scrollStep = getScrollStep();

      listRef.current.scrollBy({
        left: direction === 'left' ? -scrollStep : scrollStep,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider__header}>
        <h2 className={styles.slider__title}>{title}</h2>
        <div className={styles.slider__buttons}>
          <button
            type="button"
            className={styles.slider__button}
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scoll left"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            className={styles.slider__button}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scoll right"
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
      <div
        className={styles.slider__list}
        ref={listRef}
        onScroll={checkScrollPosition}
      >
        {products.map(product => (
          <div key={product.id} className={styles.slider__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

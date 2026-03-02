import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { ArrowLeftIcon } from '../ui/ArrowLeftIcon';

import { ProductCard } from '../ProductCard';
import { CatalogProducts } from '../../types/ProductTypes';
import styles from './ProductsSlider.module.scss';

interface ProductSliderProps {
  title: string;
  products: CatalogProducts[];
}

const MAX_VISIBLE_PRODUCTS = 12;
const SCROLL_STEPS = { mobile: 228, tablet: 253, desktop: 288 };

export const ProductsSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const listRef = useRef<HTMLDivElement>(null);

  const visibleProducts = products.slice(0, MAX_VISIBLE_PRODUCTS);

  const checkScrollPosition = useCallback(() => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkScrollPosition, 50);

    window.addEventListener('resize', checkScrollPosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition, visibleProducts]);

  const getScrollStep = useCallback(() => {
    if (window.innerWidth < 640) {
      return SCROLL_STEPS.mobile;
    }

    if (window.innerWidth < 1200) {
      return SCROLL_STEPS.tablet;
    }

    return SCROLL_STEPS.desktop;
  }, []);

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (!listRef.current) {
        return;
      }

      listRef.current.scrollBy({
        left: direction === 'left' ? -getScrollStep() : getScrollStep(),
        behavior: 'smooth',
      });
    },
    [getScrollStep],
  );

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
        {visibleProducts.map(product => (
          <div key={product.id} className={styles.slider__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

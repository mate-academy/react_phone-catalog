import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { ArrowLeftIcon } from '../ui/ArrowLeftIcon';

import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard';

interface ProductSliderProps {
  title: string;
}

//---TEMP---//
const sampleProduct = {
  id: 1,
  category: 'phones',
  itemId: 'apple-iphone-14-128gb-blue',
  name: 'Apple iPhone 14 128GB Blue',
  fullPrice: 999,
  price: 899,
  screen: '6.1" OLED',
  capacity: '128GB',
  color: 'blue',
  ram: '6GB',
  year: 2022,
  image: 'img/phones/apple-iphone-11/white/00.webp',
};

const mockProducts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({
  ...sampleProduct,
  id,
}));

export const ProductsSlider: React.FC<ProductSliderProps> = ({ title }) => {
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
        {mockProducts.map(product => (
          <div key={product.id} className={styles.slider__item}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

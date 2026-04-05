import React from 'react';
import { ArrowRightIcon } from '../ui/ArrowRightIcon';
import { ArrowLeftIcon } from '../ui/ArrowLeftIcon';
import { ProductCard } from '../ProductCard';
import { CatalogProducts } from '../../types/Types';
import styles from './ProductSlider.module.scss';
import { useSlider } from '../../hooks/useSlider';

interface ProductSliderProps {
  title: string;
  products: CatalogProducts[];
}

const MAX_VISIBLE_PRODUCTS = 12;

export const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
}) => {
  const visibleProducts = products.slice(0, MAX_VISIBLE_PRODUCTS);

  const {
    listRef,
    canScrollLeft,
    canScrollRight,
    scroll,
    checkScrollPosition,
  } = useSlider<CatalogProducts[]>(visibleProducts);

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
            aria-label="Scroll left"
          >
            <ArrowLeftIcon />
          </button>
          <button
            type="button"
            className={styles.slider__button}
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
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

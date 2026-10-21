import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { Icon } from '../Icon';
import { ProductCard } from '../ProductCard';
import styles from './ProductsSlider.module.scss';

const SCROLL_STEP = 288;
const SCROLL_EDGE_OFFSET = 2;

type ScrollDirection = 'left' | 'right';

interface SliderButtonProps {
  direction: ScrollDirection;
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const ArrowButton: React.FC<SliderButtonProps> = ({
  direction,
  label,
  disabled,
  onClick,
}) => (
  <button
    type="button"
    className={styles.button}
    aria-label={`Scroll ${label} ${direction}`}
    disabled={disabled}
    onClick={onClick}
  >
    <Icon name={direction === 'left' ? 'chevron-left' : 'chevron-right'} />
  </button>
);

interface ProductsSliderProps {
  title: string;
  products: Product[];
  hideDiscount?: boolean;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  products,
  hideDiscount = false,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const list = listRef.current;

    if (!list) {
      return undefined;
    }

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = list;

      setCanScrollLeft(scrollLeft > SCROLL_EDGE_OFFSET);
      setCanScrollRight(
        scrollLeft + clientWidth < scrollWidth - SCROLL_EDGE_OFFSET,
      );
    };

    updateScrollState();

    list.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    const observer = new ResizeObserver(updateScrollState);

    observer.observe(list);

    return () => {
      list.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
      observer.disconnect();
    };
  }, [products]);

  const handleScroll = (direction: ScrollDirection) => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    list.scrollBy({
      left: direction === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    });
  };

  const label = title.toLowerCase();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <ArrowButton
            direction="left"
            label={label}
            disabled={!canScrollLeft}
            onClick={() => handleScroll('left')}
          />
          <ArrowButton
            direction="right"
            label={label}
            disabled={!canScrollRight}
            onClick={() => handleScroll('right')}
          />
        </div>
      </div>

      <div className={styles.list} ref={listRef}>
        {products.map(product => (
          <div key={product.id} className={styles.card}>
            <ProductCard product={product} hideDiscount={hideDiscount} />
          </div>
        ))}
      </div>
    </section>
  );
};

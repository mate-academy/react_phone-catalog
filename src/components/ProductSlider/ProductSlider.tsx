import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import type { Product } from '../../types/product';
import { ChevronIcon } from '../iconsSVG';
import { ProductCard } from '../ProductCard';
import styles from './ProductSlider.module.scss';

interface Props {
  products: Product[];
  title?: string;
  emptyMessage?: string;
  hideDiscount?: boolean;
  className?: string;
}

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  emptyMessage = 'There are no phones/tablets/accessories yet',
  hideDiscount = false,
  className,
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateButtons = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    setCanLeft(track.scrollLeft > 0);
    setCanRight(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  };

  useEffect(() => {
    updateButtons();

    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    return () => {
      track.removeEventListener('scroll', updateButtons);
      window.removeEventListener('resize', updateButtons);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const slide = track.querySelector<HTMLElement>(
      `.${styles.productSlider__slide}`,
    );
    const gap = parseInt(getComputedStyle(track).columnGap, 10) || 0;
    const amount = slide ? slide.offsetWidth + gap : track.clientWidth;

    track.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  if (!products || products.length === 0) {
    return (
      <div className={cn(styles.productSlider, className)}>
        {title && <h2 className={styles.productSlider__title}>{title}</h2>}
        <div className={styles.productSlider__empty}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={cn(styles.productSlider, className)}>
      <div className={styles.productSlider__header}>
        {title && <h2 className={styles.productSlider__title}>{title}</h2>}

        <div className={styles.productSlider__controls}>
          <button
            type="button"
            className={styles.productSlider__arrow}
            onClick={() => scroll('left')}
            disabled={!canLeft}
            aria-label="Previous"
          >
            <ChevronIcon direction="right" />
          </button>

          <button
            type="button"
            className={styles.productSlider__arrow}
            onClick={() => scroll('right')}
            disabled={!canRight}
            aria-label="Next"
          >
            <ChevronIcon direction="left" />
          </button>
        </div>
      </div>

      <div className={styles.productSlider__track} ref={trackRef}>
        {products.map(product => (
          <div
            key={product.itemId ?? String(product.id)}
            className={styles.productSlider__slide}
          >
            <ProductCard product={product} hideDiscount={hideDiscount} />
          </div>
        ))}
      </div>
    </div>
  );
};

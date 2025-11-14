import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { Product } from '../../../../types';
import { ProductCard } from '../../../../components/ProductCard';
import styles from './ProductsSlider.module.scss';

const VISIBLE_SLIDES = 4;
const SLIDE_WIDTH = 272;
const GAP = 24;
const SWIPE_THRESHOLD = 50;

interface ProductsSliderProps {
  title: string;
  products: Product[];
  className?: string;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  products,
  className,
}) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // touch
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const isHotPricesSlider = title === 'Hot prices';
  const showDiscountBadge = isHotPricesSlider;
  const maxIndex = Math.max(0, products.length - VISIBLE_SLIDES);

  const updateButtonVisibility = useCallback(() => {
    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < maxIndex);
  }, [currentIndex, maxIndex]);

  useEffect(() => {
    updateButtonVisibility();
  }, [updateButtonVisibility, products]);

  const scroll = (direction: 'left' | 'right') => {
    if (isAnimating) {
      return;
    }

    const newIndex =
      direction === 'right'
        ? Math.min(currentIndex + 1, maxIndex)
        : Math.max(currentIndex - 1, 0);

    setIsAnimating(true);
    setCurrentIndex(newIndex);

    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${newIndex * (SLIDE_WIDTH + GAP)}px)`;
    }

    setTimeout(() => setIsAnimating(false), 500);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > SWIPE_THRESHOLD;
    const isRightSwipe = distance < -SWIPE_THRESHOLD;

    if (isLeftSwipe && canScrollRight) {
      scroll('right');
    } else if (isRightSwipe && canScrollLeft) {
      scroll('left');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
        trackRef.current.style.transform = `translateX(-${currentIndex * (SLIDE_WIDTH + GAP)}px)`;
        setTimeout(
          () => trackRef.current?.style.removeProperty('transition'),
          10,
        );
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={classNames(styles.productsSlider, className)}>
      <div className={styles.productsSlider__header}>
        <h2 className={styles.productsSlider__title}>{title}</h2>

        {products.length > VISIBLE_SLIDES && (
          <div className={styles.productsSlider__navigation}>
            <button
              className={classNames(
                styles.productsSlider__navButton,
                styles.productsSlider__navButton_prev,
                { [styles.productsSlider__navButton_disabled]: !canScrollLeft },
              )}
              onClick={() => scroll('left')}
              aria-label="Previous products"
              disabled={!canScrollLeft}
            >
              <img src="img/icons/icon-left.png" alt="Previous" />
            </button>

            <button
              className={classNames(
                styles.productsSlider__navButton,
                styles.productsSlider__navButton_next,
                {
                  [styles.productsSlider__navButton_disabled]: !canScrollRight,
                },
              )}
              onClick={() => scroll('right')}
              aria-label="Next products"
              disabled={!canScrollRight}
            >
              <img src="img/icons/icon-right.png" alt="Next" />
            </button>
          </div>
        )}
      </div>

      <div
        className={styles.productsSlider__container}
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ cursor: 'grab' }}
      >
        <div className={styles.productsSlider__track} ref={trackRef}>
          {products.map(product => (
            <div key={product.id} className={styles.productsSlider__slide}>
              <ProductCard
                product={product}
                showDiscountBadge={showDiscountBadge}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

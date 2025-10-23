import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Product } from '../../../../types';
import { ProductCard } from '../../../../components/ProductCard';
import styles from './ProductsSlider.module.scss';

const SPACING_LG = 16;
const SLIDE_WIDTH = 272;

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isHotPricesSlider = title === 'Hot prices';
  const showDiscountBadge = isHotPricesSlider;

  const getVisibleSlidesCount = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1200) {
      return 4;
    } else if (screenWidth >= 640 && screenWidth < 1200) {
      return 2.5;
    } else {
      return 1.5;
    }
  };

  const updateButtonVisibility = () => {
    if (!sliderRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    const scrollRightLimit = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollRightLimit - 1);
  };

  useEffect(() => {
    updateButtonVisibility();
    window.addEventListener('resize', updateButtonVisibility);

    return () => {
      window.removeEventListener('resize', updateButtonVisibility);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) {
      return;
    }

    const visibleSlides = getVisibleSlidesCount();
    let scrollAmount: number;

    if (visibleSlides === 4) {
      scrollAmount = (SLIDE_WIDTH + SPACING_LG) * 4;
    } else if (visibleSlides === 2.5) {
      scrollAmount = (SLIDE_WIDTH + SPACING_LG) * 2.5;
    } else {
      scrollAmount = (SLIDE_WIDTH + SPACING_LG) * 1.5;
    }

    const newScrollLeft =
      sliderRef.current.scrollLeft +
      (direction === 'right' ? scrollAmount : -scrollAmount);

    sliderRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className={classNames(styles.productsSlider, className)}>
      <div className={styles.productsSlider__header}>
        <h2 className={styles.productsSlider__title}>{title}</h2>

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
              { [styles.productsSlider__navButton_disabled]: !canScrollRight },
            )}
            onClick={() => scroll('right')}
            aria-label="Next products"
            disabled={!canScrollRight}
          >
            <img src="img/icons/icon-right.png" alt="Next" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className={styles.productsSlider__container}
        onScroll={updateButtonVisibility}
      >
        <div className={styles.productsSlider__track}>
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

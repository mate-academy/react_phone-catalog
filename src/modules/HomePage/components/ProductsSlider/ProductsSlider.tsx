import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Product } from '../../../../types';
import { ProductCard } from '../../../../components/ProductCard';
import styles from './ProductsSlider.module.scss';

const VISIBLE_SLIDES = 4;

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
    if (direction === 'right') {
      const newIndex = Math.min(currentIndex + 1, maxIndex);

      setCurrentIndex(newIndex);
    } else {
      const newIndex = Math.max(currentIndex - 1, 0);

      setCurrentIndex(newIndex);
    }
  };

  const getVisibleProducts = () => {
    return products.slice(currentIndex, currentIndex + VISIBLE_SLIDES);
  };

  if (products.length === 0) {
    return null;
  }

  const visibleProducts = getVisibleProducts();

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

      <div className={styles.productsSlider__container}>
        <div className={styles.productsSlider__track}>
          {visibleProducts.map(product => (
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

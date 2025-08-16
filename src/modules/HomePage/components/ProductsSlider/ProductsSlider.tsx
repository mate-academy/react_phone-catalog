import React, { useEffect, useState } from 'react';
import { Product } from '../../../shared/types/Product';
import { Icon } from '../../../shared/components/Icon/Icon';
import { icons } from '../../../shared/constants/icons';
import { ProductCard } from './ProductCard';

import cn from 'classnames';
import styles from './ProductsSlider.module.scss';

interface ProductSliderProps {
  title: string;
  products: Product[];
  displayType: 'fullprice' | 'discount';
}

export const ProductsSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
  displayType,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth >= 1440) {
        setVisibleCount(4);
      } else if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    }

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);
  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, products.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= products.length - 4;

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel__top}>
        <h2 className={styles['carousel__top-title']}>{title}</h2>
        <div className={styles.carousel__navigation}>
          <button
            className={cn(styles.carousel__navigation_btn, 'button-icon', {
              disabled: isPrevDisabled,
            })}
            disabled={isPrevDisabled}
            onClick={handlePrev}
          >
            <Icon icon={icons.arrow_left} />
          </button>
          <button
            className={cn(styles.carousel__navigation_btn, 'button-icon', {
              disabled: isNextDisabled,
            })}
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            <Icon icon={icons.arrow_right} />
          </button>
        </div>
      </div>
      <div className={styles.carousel__contentWrapper}>
        <div
          className={styles.carousel__content}
          style={{
            transform: `translateX(-${currentIndex * (100 / products.length)}%)`,
            transition: 'transform 0.5s ease',
            width: `${(100 * products.length) / visibleCount}%`,
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className={styles.carousel__item}
              style={{ width: `${100 / products.length}%` }}
            >
              <ProductCard
                key={product.id}
                product={product}
                displayType={displayType}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

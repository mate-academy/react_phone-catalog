import React, { useState } from 'react';
import { ProductType } from 'types/productTypes';
import { ArrowLeftIcon } from '@components/Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '@components/Icons/ArrowRightIcon';
import { ProductCard } from '@components/ProductCard';
import { useSwipe } from '@hooks/useSwipe';

import cn from 'classnames';
import styles from './ProductSlider.module.scss';

interface ProductSliderProps {
  data: ProductType[];
  title: string;
  hideOldPrice?: boolean;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  data,
  title,
  hideOldPrice,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, data.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  });

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === data.length - 1;

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.carousel__top}>
        <h2 className={cn(styles.title, 'secondary-title')}>{title}</h2>
        <div className={styles.carousel__navigation}>
          <button
            className={cn(styles.carousel__navigation_btn, 'button-icon', {
              disabled: isPrevDisabled,
            })}
            disabled={isPrevDisabled}
            onClick={handlePrev}
          >
            <ArrowLeftIcon active={isPrevDisabled} />
          </button>
          <button
            className={cn(styles.carousel__navigation_btn, 'button-icon', {
              disabled: isNextDisabled,
            })}
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            <ArrowRightIcon active={isNextDisabled} />
          </button>
        </div>
      </div>
      <div className={styles.carousel__content}>
        {data.slice(currentIndex, currentIndex + 4).map(card => (
          <ProductCard key={card.id} card={card} hideOldPrice={hideOldPrice} />
        ))}
      </div>
    </div>
  );
};

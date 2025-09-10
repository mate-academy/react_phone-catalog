import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Product';
import { Icon } from '../Icon/Icon';
import { icons } from '../../constants/icons';
import { ProductCard } from '../ProductCard';

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

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const gap = 16;

  // считаем количество карточек по брейкпоинтам
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

  // считаем ширину карточки от wrapper
  useEffect(() => {
    function updateCardWidth() {
      if (wrapperRef.current) {
        const wrapperWidth = wrapperRef.current.offsetWidth;

        setCardWidth((wrapperWidth - gap * (visibleCount - 1)) / visibleCount);
      }
    }

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);

    return () => window.removeEventListener('resize', updateCardWidth);
  }, [visibleCount]);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, products.length - visibleCount));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex >= products.length - visibleCount;

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

      <div className={styles.carousel__contentWrapper} ref={wrapperRef}>
        <div
          className={styles.carousel__content}
          style={{
            transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
            transition: 'transform 0.5s ease',
            display: 'flex',
            gap: `${gap}px`,
          }}
        >
          {products.map(product => (
            <div
              key={product.id}
              className={styles.carousel__item}
              style={{ width: `${cardWidth}px` }}
            >
              <ProductCard product={product} displayType={displayType} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

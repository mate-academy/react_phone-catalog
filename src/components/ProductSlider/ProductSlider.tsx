import React, { useCallback, useEffect, useRef, useState } from 'react';
import style from './ProductSlider.module.scss';
import { ProductType } from '../../types/ProductType';
import { ArrowIconLeft } from '../Icons/ArrowIconLeft';
import { ArrowIconRight } from '../Icons/ArrowIconRight';
import { Card } from '../Card/Card';

interface Props {
  products: ProductType[];
  title: string;
  sortFunction?: (a: ProductType, b: ProductType) => number;
}

export const ProductSlider: React.FC<Props> = ({
  products,
  title,
  sortFunction,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(0);
  const [sortedSlides, setSortedSlides] = useState<ProductType[] | []>([]);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSlideWidth = useCallback(() => {
    if (window.matchMedia('(max-width: 639px)').matches) {
      setSlideWidth(212);
      setVisibleSlides(1);
    } else if (
      window.matchMedia('(min-width: 640px) and (max-width: 1199px)').matches
    ) {
      setSlideWidth(237);
      setVisibleSlides(2);
    } else {
      setSlideWidth(272);
      setVisibleSlides(3);
    }
  }, []);

  useEffect(() => {
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);

    return () => window.removeEventListener('resize', updateSlideWidth);
  }, [updateSlideWidth]);

  const handleNavigation = useCallback(
    (direction: 'next' | 'prev') => {
      setCurrentIndex(prevIndex => {
        const maxIndex = Math.max(0, products.length - visibleSlides);

        if (direction === 'next') {
          return prevIndex === maxIndex ? prevIndex : prevIndex + 1;
        }

        return prevIndex === 0 ? 0 : prevIndex - 1;
      });
    },
    [products.length, visibleSlides],
  );

  const handleSwipe = useCallback(
    (startX: number, endX: number) => {
      if (startX - endX > 50) {
        handleNavigation('next');
      } else if (endX - startX > 50) {
        handleNavigation('prev');
      }
    },
    [handleNavigation],
  );

  let touchStartX = 0;
  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled =
    currentIndex >= Math.max(0, products.length - visibleSlides);

  useEffect(() => {
    setSortedSlides([...products].sort(sortFunction));
  }, [products, sortFunction]);

  return (
    <div className={style.product__carousel}>
      <div className={style.product__carousel_nav}>
        <h2 className={style.product__carousel_nav_title}>{title}</h2>

        <div
          className={`${style.product__carousel_nav_direction} ${isPrevDisabled && style.disabled}`}
        >
          <button
            className={`${style.product__carousel_nav_direction_button} ${
              isPrevDisabled && style.disabled
            }`}
            disabled={isPrevDisabled}
            onClick={() => handleNavigation('prev')}
          >
            <ArrowIconLeft active={isPrevDisabled} />
          </button>

          <button
            className={`${style.product__carousel_nav_direction_button} ${
              isNextDisabled && style.disabled
            }`}
            disabled={isNextDisabled}
            onClick={() => handleNavigation('next')}
          >
            <ArrowIconRight active={!isNextDisabled} />
          </button>
        </div>
      </div>

      <div
        className={style.product_slider__carousel}
        ref={containerRef}
        onTouchStart={e => (touchStartX = e.touches[0].clientX)}
        onTouchEnd={e => handleSwipe(touchStartX, e.changedTouches[0].clientX)}
      >
        <div
          className={style.product__carousel_product}
          style={{
            transform: `translateX(-${currentIndex * (slideWidth + 16)}px)`,
            width: `${products.length * slideWidth}px`,
          }}
        >
          {sortedSlides.map(product => (
            <Card product={product} key={product.itemId} />
          ))}
        </div>
      </div>
    </div>
  );
};

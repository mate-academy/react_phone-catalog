import React, { useCallback, useEffect, useRef, useState } from 'react';
import style from './ProductSlider.module.scss';
import { Card } from '../Card/Card';
import { ProductType } from '../../types/ProductType';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';

interface Props {
  title: string;
  products: ProductType[];
  sortFunction?: (a: ProductType, b: ProductType) => number;
}

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  sortFunction,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortedSlides, setSortedSlides] = useState<ProductType[] | []>([]);
  const [slideWidth, setSlideWidth] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(0);
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
    <div className={style.products__carousel}>
      <div className={style.products__carousel_navigation}>
        <h2 className={style.products__carousel_navigation_title}>{title}</h2>

        <div className={style.products__carousel_navigation_directions}>
          <button
            className={`${style.products__carousel_navigation_directions_button} ${
              isPrevDisabled && style.disabled
            }`}
            onClick={() => handleNavigation('prev')}
            disabled={isPrevDisabled}
          >
            <ArrowLeftIcon active={isPrevDisabled} />
          </button>

          <button
            className={`${style.products__carousel_navigation_directions_button} ${
              isNextDisabled && style.disabled
            }`}
            onClick={() => handleNavigation('next')}
            disabled={isNextDisabled}
          >
            <ArrowRightIcon active={!isNextDisabled} />
          </button>
        </div>
      </div>

      <div
        className="product-slider__carousel"
        ref={containerRef}
        onTouchStart={e => (touchStartX = e.touches[0].clientX)}
        onTouchEnd={e => handleSwipe(touchStartX, e.changedTouches[0].clientX)}
      >
        <div
          className={style.products__carousel_product}
          style={{
            transform: `translateX(-${currentIndex * (slideWidth + 16)}px)`,
            width: `${products.length * slideWidth}px`,
          }}
        >
          {sortedSlides.map(product => (
            <Card product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

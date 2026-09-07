import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { Pages } from '../../enums';
import { Product } from '../../types';
import { ProductCard } from '../../pages';
import { ArrowLeftIcon, ArrowRight, Button } from '..';
import './ProductsSlider.scss';

type Props = {
  title: string;
  slides: Product[];
  sortFunction?: (a: Product, b: Product) => number;
};

export const ProductsSlider: React.FC<Props> = ({
  slides,
  title,
  sortFunction,
}) => {
  const [sortedSlides, setSortedSlides] = useState<Product[] | []>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
        const maxIndex = Math.max(0, slides.length - visibleSlides);

        if (direction === 'next') {
          return prevIndex === maxIndex ? prevIndex : prevIndex + 1;
        }

        return prevIndex === 0 ? 0 : prevIndex - 1;
      });
    },
    [slides.length, visibleSlides],
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
    currentIndex >= Math.max(0, slides.length - visibleSlides);

  useEffect(() => {
    setSortedSlides([...slides].sort(sortFunction));
  }, [slides, sortFunction]);

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h2 className="product-slider__title typography__h2">{title}</h2>

        <div className="product-slider__button-wrapper">
          <Button
            shape="round"
            className={classNames(
              'product-slider__button',
              'product-slider__button--prev',
              { disabled: isPrevDisabled },
            )}
            onClick={() => handleNavigation('prev')}
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            shape="round"
            className={classNames(
              'product-slider__button',
              'product-slider__button--next',
              { disabled: isNextDisabled },
            )}
            onClick={() => handleNavigation('next')}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div
        className="product-slider__carousel"
        ref={containerRef}
        onTouchStart={e => (touchStartX = e.touches[0].clientX)}
        onTouchEnd={e => handleSwipe(touchStartX, e.changedTouches[0].clientX)}
      >
        <div
          className="product-slider__track"
          style={{
            transform: `translateX(-${currentIndex * (slideWidth + 16)}px)`,
            width: `${slides.length * slideWidth}px`,
          }}
        >
          {sortedSlides.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              page={Pages.HomePage}
              blockTitle={title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

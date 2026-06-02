/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

import { useState, useEffect } from 'react';
import { ProductCard } from '@/modules/shared/components/ProductCard';

import { ProductType } from '@/modules/shared/utils/types';

import arrowLeft from '@/assets/svg/arrow-left.svg';
import arrowRight from '@/assets/svg/arrow-right.svg';

import styles from './ProductsSlider.module.scss';

const {
  sliderContainer,
  headerBlock,
  sliderTitle,
  buttonsBlock,
  arrowBtn,
  viewport,
  track,
} = styles;

interface Props {
  title: string;
  products: ProductType[];
  hasDiscount?: boolean;
}

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  hasDiscount = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [stepWidth, setStepWidth] = useState(288); // 272 + 16

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Мобілка: 1 картка у в'юпорті
        setVisibleCards(1);
        setStepWidth(228);
      } else if (width < 840) {
        // Маленький планшет: у в'юпорті вміщається лише 2 картки
        setVisibleCards(2);
        setStepWidth(253);
      } else if (width < 1200) {
        // Великий планшет: тут уже вільно вміщається 3 картки
        setVisibleCards(3);
        setStepWidth(253);
      } else {
        // Десктоп: 4 картки у в'юпорті
        setVisibleCards(4);
        setStepWidth(288);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCards);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className={sliderContainer}>
      <div className={headerBlock}>
        <h2 className={sliderTitle}>{title}</h2>
        <div className={buttonsBlock}>
          <button
            type="button"
            className={arrowBtn}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img src={arrowLeft} alt="Previous" />
          </button>
          <button
            type="button"
            className={arrowBtn}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      </div>

      <div className={viewport}>
        <div
          className={track}
          style={{ transform: `translateX(-${currentIndex * stepWidth}px)` }}
        >
          {products.map(item => (
            <ProductCard
              key={item.id}
              product={item}
              showDiscount={hasDiscount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

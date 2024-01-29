import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { ProductItem } from '../../types/ProductItem';
import { ProductCard } from '../ProductCard';

import './ProductSlider.scss';

interface ProductSliderProps {
  title: string;
  productList: ProductItem[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  productList,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardPerTime, setCardPerTime] = useState(4);
  const [cardWidth, setCardWidth] = useState(266);
  const [gap, setGap] = useState(24);

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => {
      return Math.min(prevIndex + 1, productList.length - 1);
    });
  };

  const handleCardParametersChange = (
    newCount: number,
    newWidth: number,
    newGap: number,
  ) => {
    setCardPerTime(newCount);
    setCardWidth(newWidth);
    setGap(newGap);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 480) {
        handleCardParametersChange(1, 330, 0);
      } else if (width <= 768) {
        handleCardParametersChange(1, 378, 0);
      } else if (width <= 1024) {
        handleCardParametersChange(3, 266, 20);
      } else if (width <= 1137) {
        handleCardParametersChange(3, 266, 83);
      } else {
        handleCardParametersChange(4, 266, 24);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const translateXValue = -(((cardWidth + gap) * cardPerTime) * currentIndex);

  return (
    <div className="product-slider">
      <div className="product-slider__top">
        <h2 className="product-slider__title">
          {title}
        </h2>
        <div className="product-slider__buttons">
          {/* eslint-disable-next-line */}
          <button
            className={
              cn('product-slider__button product-slider__button--left', {
                /* eslint-disable-next-line */
                'product-slider__button--disabled': currentIndex === 0,
              })
            }
            onClick={handlePrevSlide}
          />
          {/* eslint-disable-next-line */}
          <button
            className={
              cn('product-slider__button product-slider__button--right', {
                /* eslint-disable-next-line */
                'product-slider__button--disabled': ((currentIndex + 1) * cardPerTime) >= productList.length,
              })
            }
            onClick={handleNextSlide}
          />
        </div>
      </div>

      <div className="product-slider__wrapper">
        <div className="product-slider__slides" style={{ transform: `translateX(${translateXValue}px)` }}>
          {productList.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;

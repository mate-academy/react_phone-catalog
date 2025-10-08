import React, { useState } from 'react';
import leftArrowDisabled from '../../images/icons/arrow-left-disabled.svg';
import leftArrowActive from '../../images/icons/arrow-left-active.svg';
import rightArrowDisabled from '../../images/icons/arrow-right-disabled.svg';
import rightArrowActive from '../../images/icons/arrow-right-active.svg';
import classNames from 'classnames';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';

import './ProductsSlider.scss';

type ProductSliderProps = {
  title: string;
  products: Product[];
  displayType: 'fullPrice' | 'with-discount';
};

export const ProductsSlider: React.FC<ProductSliderProps> = ({
  title,
  products,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 4;

  const maxIndex = Math.max(products.length - visibleCount, 0);

  const handlePrev = () =>
    setCurrentIndex(prev => Math.max(prev - visibleCount, 0));
  const handleNext = () =>
    setCurrentIndex(prev => Math.min(prev + visibleCount, maxIndex));

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + visibleCount,
  );

  return (
    <div className="products-slider">
      <div className="products-slider__managment">
        <div className="products-slider__title">{title}</div>
        <div className="products-slider__buttons">
          <button
            className={classNames('products-slider__button', {
              'products-slider__button--disabled': currentIndex === 0,
            })}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img
              src={currentIndex === 0 ? leftArrowDisabled : leftArrowActive}
              alt="Previous"
            />
          </button>
          <button
            className={classNames('products-slider__button', {
              'products-slider__button--disabled': currentIndex === maxIndex,
            })}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            <img
              src={
                currentIndex === maxIndex
                  ? rightArrowDisabled
                  : rightArrowActive
              }
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className="products-slider__items">
        {visibleProducts.map(product => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </div>
    </div>
  );
};

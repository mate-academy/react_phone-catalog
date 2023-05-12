import React, { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [position, setPosition] = useState(0);
  let frameSize;
  const itemWidth = 272;
  const gap = 16;
  const animationDuration = 1000;

  const { width = 0, ref } = useResizeDetector({
    handleHeight: false,
    refreshMode: 'debounce',
    refreshRate: 300,
  });

  const getSliderWidth = (size: number) => {
    return (itemWidth + gap) * size - gap;
  };

  if (width < getSliderWidth(2)) {
    frameSize = 1;
  } else if (width >= getSliderWidth(2) && width < getSliderWidth(3)) {
    frameSize = 2;
  } else if (width >= getSliderWidth(3) && width < getSliderWidth(4)) {
    frameSize = 3;
  } else {
    frameSize = 4;
  }

  const sliderWidth = getSliderWidth(frameSize);
  const step = frameSize;
  const shift = (itemWidth + gap) * step;
  const endPosition = (-itemWidth - gap) * (products.length - frameSize);

  const handlerPreviousButton = () => {
    let currentPosition = position;

    currentPosition += shift;
    currentPosition = Math.min(currentPosition, 0);
    setPosition(currentPosition);
  };

  const handlerNextButton = () => {
    let currentPosition = position;

    currentPosition -= shift;
    currentPosition = Math.max(currentPosition, endPosition);

    setPosition(currentPosition);
  };

  return (
    <div className="products-slider" ref={ref}>
      <div className="products-slider__top">
        <h1>{title}</h1>
        <div className="products-slider__buttons">
          <button
            type="button"
            className="button"
            onClick={handlerPreviousButton}
            disabled={position === 0}
          >
            <span
              className={
                `icon ${position === 0 ? 'icon--left-disabled' : 'icon--left'}`
              }
            />
          </button>
          <button
            type="button"
            className="button"
            onClick={handlerNextButton}
            disabled={position === endPosition}
          >
            <span
              className={
                `icon ${position === endPosition ? 'icon--right-disabled' : 'icon--right'}`
              }
            />
          </button>
        </div>
      </div>
      <div className="products-slider__slider" style={{ width: `${sliderWidth}px` }}>
        <ul
          className="products-slider__list"
          style={{
            transition: `margin-left ${animationDuration}ms`,
            marginLeft: `${position}px`,
          }}
        >
          {products.map(product => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { SliderControl } from './SliderControl';
import { DIRECTIONS } from '../../common/constants';
import { useShowcaseBlock } from '../_hooks/useShowcaseBlock';

export const SliderProducts = ({
  title,
  selectedProduct,
}: SliderProps) => {
  const {
    currentProducts,
    position,
    animationDuration,
    handleSlide,
    maxPosition,
    controlsAreHidden,
    productCardRef,
    sliderContainerRef,
  } = useShowcaseBlock(title, selectedProduct);

  return (
    <div className="slider" ref={sliderContainerRef}>
      <div className="slider__container">
        <div
          className="slider__list"
          style={{
            transform: `translateX(${position}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {currentProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              {...product}
              productCardRef={productCardRef}
            />
          ))}
        </div>
      </div>
      {controlsAreHidden && (
        <div className="slider__controls">
          <SliderControl
            handleSlide={handleSlide}
            direction={DIRECTIONS.left}
            position={position}
            maxPosition={maxPosition}
          />
          <SliderControl
            handleSlide={handleSlide}
            direction={DIRECTIONS.right}
            position={position}
            maxPosition={maxPosition}
          />
        </div>
      )}
    </div>
  );
};

import React, { useMemo } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

export const SliderProducts = ({
  products,
  position,
  animationDuration,
  productCardRef,
  itemWidth,
  frameSize,
}: SliderProps) => {
  const sliderVisibleWidth = useMemo(
    () => frameSize * itemWidth,
    [frameSize, itemWidth]);

  return (
    <div
      className="slider"
      style={{ width: `${sliderVisibleWidth}px` }}
    >
      <div
        className="slider__list"
        style={{
          transform: `translateX(${position}px)`,
          transition: `transform ${animationDuration}ms`,
        }}
      >
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            {...product}
            productCardRef={productCardRef}
          />
        ))}
      </div>
    </div>
  );
};

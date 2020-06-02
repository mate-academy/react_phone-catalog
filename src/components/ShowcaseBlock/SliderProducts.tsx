import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

export const SliderProducts = ({
  products,
  position,
  animationDuration,
  productCardRef,
  sliderVisibleWidth
}: SliderProps) => {
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

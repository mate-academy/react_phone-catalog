import React from 'react';
import { Product } from './Product';

export const SliderProducts = ({
  products,
  frameSize,
  position,
  animationDuration,
  itemWidth,
}: SliderProps) => (
  <div
    className="slider"
    style={{ width: `${frameSize * itemWidth}px` }}
  >
    <div
      className="slider__list"
      style={{
        transform: `translateX(${position}px)`,
        transition: `transform ${animationDuration}ms`,
      }}
    >
      {products.map((product: Product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  </div>
);

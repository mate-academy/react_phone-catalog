import React from 'react';
import { Product } from './Product';

export const SliderProducts = ({
  products,
  position,
  animationDuration,
}: SliderProps) => (
  <div className="slider">
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

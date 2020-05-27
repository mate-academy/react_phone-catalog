import React from 'react';
import { Product } from '../Product/Product';

export const SliderProducts = ({
  products,
  position,
  animationDuration,
  productCard,
  frameSize,
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
        <Product
          key={product.id}
          {...product}
          productCard={productCard}
        />
      ))}
    </div>
  </div>
);

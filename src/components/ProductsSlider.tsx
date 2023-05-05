import React, { useState } from 'react';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [position, setPosition] = useState(0);
  const step = 4;
  const frameSize = 4;
  const itemWidth = 272;
  const gap = 16;
  const animationDuration = 1000;
  const endPosition = (-itemWidth - gap) * (products.length - frameSize);
  const shift = (itemWidth + gap) * step;

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
    <div className="products-slider">
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
      <div className="products-slider__slider">
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

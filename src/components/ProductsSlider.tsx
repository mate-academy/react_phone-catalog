/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/Product';

import '../styles/ProductsSlider.scss';

interface Props {
  products: Product[],
  title: string,
}

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const frameSize = 4;
  const step = frameSize;
  const itemWidth = 272;
  const gap = 16;
  const infinite = false;
  const animationDuration = 1000;
  const [startIndex, setStartIndex] = useState(0);
  const lastFrame = products.length - frameSize;

  const itemStyle = {
    transitionDuration: `${animationDuration}ms`,
    transform: `translateX(-${startIndex * (itemWidth + gap)}px)`,
  };

  const moveLeft = (stepShift: number) => {
    const isEnoughImages = stepShift - startIndex >= 0;

    if (startIndex === 0 && infinite) {
      setStartIndex(lastFrame);
    } else if (isEnoughImages) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex - stepShift);
    }
  };

  const moveRight = (stepShift: number) => {
    const isEnoughImages = startIndex + stepShift >= lastFrame;

    if (startIndex === lastFrame && infinite) {
      setStartIndex(0);
    } else if (isEnoughImages) {
      setStartIndex(lastFrame);
    } else {
      setStartIndex(startIndex + stepShift);
    }
  };

  return (
    <section className="ProductsSlider HomePage-section">
      <div className="ProductsSlider__top">
        <h2 className="ProductsSlider__title">
          {title}
        </h2>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            className="ProductsSlider__button-left"
            onClick={() => moveLeft(step)}
            disabled={startIndex === 0}
          />

          <button
            type="button"
            className="ProductsSlider__button-right"
            onClick={() => moveRight(step)}
            disabled={startIndex === products.length - frameSize}
          />

        </div>
      </div>

      <div className="ProductsSlider__content">
        <ul className="ProductsSlider__list">
          {products.map(product => (
            <li key={product.itemId} style={itemStyle}>
              <ProductCard
                // key={product.itemId}
                product={product}
                data-cy="cardsContainer"
              />
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
};

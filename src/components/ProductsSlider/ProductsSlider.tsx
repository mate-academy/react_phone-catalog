/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

type Props = {
  title: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
}) => {
  const [offset, setOffset] = useState(0);

  const fullWidthOfList = 288 * (products.length - 4);
  const handleClickButton = (direction: string) => {
    switch (direction) {
      case 'prev':
        if (offset === 0) {
          setOffset(fullWidthOfList);

          return;
        }

        setOffset(current => current - 288);
        break;
      case 'next':
        if (offset === fullWidthOfList) {
          setOffset(0);

          return;
        }

        setOffset(current => current + 288);
        break;
      default:
        break;
    }
  };

  return (
    <div className="products-slider">
      <div className="products-slider__heading">
        <h1 className="section__title">
          {title}
        </h1>

        <div className="products-slider__toggle-buttons">
          <button
            type="button"
            className="toggle-buttons toggle-buttons__prev-button"
            onClick={() => handleClickButton('prev')}
          />

          <button
            type="button"
            className="toggle-buttons toggle-buttons__next-button"
            onClick={() => handleClickButton('next')}
          />
        </div>
      </div>

      <div className="products-slider__slider-list">
        <ul
          className="slider-list"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {products.map(product => (
            <ProductCard
              product={product}
              key={product.id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import classNames from 'classnames';

import './ProductsSlider.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import { ArrowLeft } from '../ArrowLeft/ArrowLeft';
import { ArrowRight } from '../ArrowRight/ArrowRight';

type Props = {
  products: Product[],
  title: string,
};

export const ProductsSlider: React.FC<Props> = ({ products, title }) => {
  const [firstElem, setFirstElem] = useState(0);

  const handleClickLeft = () => {
    let value = firstElem - 4;

    if (value < 0) {
      value = 0;
    }

    setFirstElem(value);
  };

  const handleClickRight = () => {
    let value = firstElem + 4;

    if (value > products.length - 4) {
      value = products.length - 4;
      if (value < 0) {
        value = 0;
      }
    }

    setFirstElem(value);
  };

  const isRight = firstElem < products.length - 5;

  return (
    <div className="products-slider container">
      <div className="products-slider__header">
        <h2 className="products-slider__title">{title}</h2>

        <div className="products-slider__buttons">
          <button
            type="button"
            className={classNames('products-slider__button', {
              'products-slider__button--active': firstElem > 0,
            })}
            onClick={handleClickLeft}
          >
            <ArrowLeft />
          </button>

          <button
            type="button"
            className={classNames(
              'products-slider__button',
              { 'products-slider__button--active': isRight },
            )}
            onClick={handleClickRight}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="products-slider__content">
        {products.slice(firstElem, firstElem + 4)
          .map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

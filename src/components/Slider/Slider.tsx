import React from 'react';
import './Slider.scss';
import { Product } from '../../type/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  title: string;
};

export const Slider: React.FC<Props> = ({ products, title }) => {
  // console.log(products);

  return (
    <div className="Slider">
      <div className="Slider__header">
        <h1 className="Slider__header-name">{title}</h1>

        <div className="Buttons">
          <button
            type="button"
            className="Buttons__item Buttons__item-prev"
            aria-label="previous"
          >
            <img src="icons/Arrow_Left_small.svg" alt="previous" />
          </button>

          <button
            type="button"
            className="Buttons__item Buttons__item-next"
            aria-label="next"
          >
            <img src="icons/Arrow_Right_small.svg" alt="next" />
          </button>
        </div>
      </div>
      <div className="Slider__box">
        <div
          className="Slider__content"
          style={{
            transform: 'translateX(-1500px)',
          }}
        >
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

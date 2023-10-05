import { FC, useState } from 'react';
import classNames from 'classnames';

import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem/ProductItem';

import './ProductSlider.scss';

type Props = {
  title: string,
  products: Product[],
};

export const ProductSlider: FC<Props> = ({ title, products }) => {
  const [start, setStart] = useState(0);

  const visibleCount = 4;
  const end = start + visibleCount;

  return (
    <div className="product__slider">
      <div className="product__slider-row">
        <div className="product__slider-title">{title}</div>
        <div className="product__slider-navigation">
          <button
            type="button"
            aria-label="navigate"
            className={classNames('product__slider--button button-square', {
              'button-disabled': start <= 0,
            })}
            onClick={() => setStart((prev) => prev - 1)}
          >
            <img src="img/Icons/ArrowLeft.png" alt="Arrow Left" />
          </button>
          <button
            type="button"
            aria-label="navigate"
            className={classNames('product__slider--button button-square', {
              'button-disabled': end > products.length,
            })}
            onClick={() => setStart((prev) => prev + 1)}
          >
            <img src="img/Icons/ArrowRight.png" alt="Arrow Right" />
          </button>
        </div>

        <div className="product__list">
          {products.slice(start, end).map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

import './ProductsSlider.scss';

import classNames from 'classnames';
import { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductItem } from '../ProductItem';

type Props = {
  title: string,
  products: Product[],
  addProductToCart: (product: Product) => void,
};

export const ProductsSlider: React.FC <Props> = ({
  title,
  products,
  addProductToCart,
}) => {
  const count = 4;
  const [first, setFirst] = useState(0);
  const last = first + count;
  const isFirst = first <= 0;
  const isLast = last > products.length - 1;

  return (
    <div className="products-slider">
      <div className="products-slider__top">
        <h2 className="products-slider__title">
          {title}
        </h2>

        <div className="products-slider__buttons-box">
          <button
            type="button"
            className={classNames(
              'products-slider__button',
              'button-square',
              {
                'button-square--disabled': isFirst,
              },
            )}
            onClick={() => setFirst((prev) => prev - 1)}
          >
            <img src="_new/img/icons/arrow_left.svg" alt="arrow left" />
          </button>

          <button
            type="button"
            className={classNames(
              'products-slider__button',
              'button-square',
              {
                'button-square--disabled': isLast,
              },
            )}
            onClick={() => setFirst((prev) => prev + 1)}
          >
            <img src="_new/img/icons/arrow_right.svg" alt="arrow right" />
          </button>
        </div>
      </div>
      <div className="products-slider__content">
        <div className="products-slider__product-items">
          {products.slice(first, last).map(product => (
            <ProductItem
              key={product.itemId}
              product={product}
              addProductToCart={addProductToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

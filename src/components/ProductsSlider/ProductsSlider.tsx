import { FC, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

type Props = {
  products: Product[],
  title: string,
};

export const ProductsSlider: FC<Props> = ({
  products,
  title,
}) => {
  const [start, setStart] = useState(0);
  const visibleCount = 4;
  const end = start + visibleCount;

  return (
    <>
      <div className="slider__header">
        <h1 className="slider__title">
          {title}
        </h1>
        <div className="slider__button-group">
          <button
            type="button"
            className={classNames('slider__button square-button', {
              'square-button--disabled': start === 0,
            })}
            onClick={() => setStart((prev) => prev - 1)}
          >
            <img src="icons/leftArrow.svg" alt="next button" />
          </button>
          <button
            type="button"
            className={classNames('slider__button square-button', {
              'square-button--disabled': end === products.length,
            })}
            onClick={() => setStart((prev) => prev + 1)}
          >
            <img src="icons/rightArrow.svg" alt="previous button" />
          </button>
        </div>
      </div>
      <div className="slider__grid">
        <ul className="grid" data-cy="cardsContainer">
          {products.slice(start, end).map((product, index) => (
            <ProductCard product={product} key={product.id} index={index} />
          ))}
        </ul>
      </div>
    </>
  );
};

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import React, { useState } from 'react';
import classNames from 'classnames';
import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  productsList: Product[];
  showOldPrice: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  productsList,
  showOldPrice,
}) => {
  const [position, setPosition] = useState(0);

  const isLastPosition = productsList.length - 4;
  const isDisabledButtonPrev = position === 0;
  const isDisabledButtonNext = position === isLastPosition;

  const onButtonNext = () => {
    if (position + 1 < isLastPosition) {
      setPosition(position + 1);
    } else {
      setPosition(isLastPosition);
    }
  };

  const onButtonPrev = () => {
    if (position - 1 > 0) {
      setPosition(position - 1);
    } else {
      setPosition(0);
    }
  };

  return (
    <div className="productsSlider">
      <div className="productsSlider__wrapper">
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            position={position}
            showOldPrice={showOldPrice}
          />
        ))}
      </div>

      <div className="productsSlider__buttons">
        <button
          className={classNames(
            'productsSlider__button',
            'productsSlider__button--prev', {
              'productsSlider__button--disabled': isDisabledButtonPrev,
            },
          )}
          type="button"
          onClick={onButtonPrev}
          disabled={isDisabledButtonPrev}
        >
          {!isDisabledButtonPrev
            ? (
              <img
                src={require('../../images/icons/slider-arrow-left.svg').default}
                alt="Prev"
              />
            )
            : (
              <img
                src={require('../../images/icons/slider-arrow-left-disabled.svg').default}
                alt="Prev"
              />
            )}
        </button>

        <button
          className={classNames(
            'productsSlider__button',
            'productsSlider__button--next', {
              'productsSlider__button--disabled': isDisabledButtonNext,
            },
          )}
          type="button"
          data-cy="next"
          onClick={onButtonNext}
          disabled={isDisabledButtonNext}
        >
          {!isDisabledButtonNext
            ? (
              <img
                src={require('../../images/icons/slider-arrow-right.svg').default}
                alt="Next"
              />
            )
            : (
              <img
                src={require('../../images/icons/slider-arrow-right-disabled.svg').default}
                alt="Next"
              />
            )}
        </button>
      </div>
    </div>
  );
};

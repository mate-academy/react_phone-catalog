import classNames from 'classnames';
import React from 'react';
import './PriceBlock.scss';

type Props = {
  price: number;
  discount: number;
  isBig: boolean;
  border: boolean;
};

export const PriceBlock: React.FC<Props> = (
  {
    price, discount, isBig, border,
  },
) => (
  <div
    className={classNames(
      'price-block',
      { 'price-block--border-none': !border },
    )}
  >
    {discount
      ? (
        <>
          <span
            className={classNames(
              'price-block__price',
              { 'price-block__price--is-big': isBig },
            )}
          >
            {Math.ceil(price - price / discount)}
            $
          </span>
          <span
            className="
              price-block__price
              price-block__price--is-old"
          >
            {price}
            $
          </span>
        </>
      ) : (
        <span
          className={classNames(
            'price-block__price',
            { 'price-block__price--is-big': isBig },
          )}
        >
          {price}
          $
        </span>
      )}
  </div>
);

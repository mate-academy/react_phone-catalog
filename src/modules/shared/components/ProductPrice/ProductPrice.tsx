import React from 'react';
import cn from 'classnames';
import style from './productPrice.module.scss';

interface Props {
  fullPrice: number;
  priceDiscount?: number;
}

export const ProductPrice: React.FC<Props> = React.memo(
  ({ fullPrice, priceDiscount }) => {
    return (
      <div className={cn(style['price-content'])}>
        {priceDiscount && (
          <h2 className={cn(style['price-content__price'])}>
            ${priceDiscount}
          </h2>
        )}
        <h2
          className={cn(style['price-content__price'], {
            [style['price-content__price--cancel']]: priceDiscount,
          })}
        >
          ${fullPrice}
        </h2>
      </div>
    );
  },
);

ProductPrice.displayName = 'ProductPrice';

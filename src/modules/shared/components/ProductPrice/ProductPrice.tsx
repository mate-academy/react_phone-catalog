import React from 'react';
import './ProductPrice.scss';
import classNames from 'classnames';

type ProductPriceProps = {
  price: number;
  fullPrice: number;
  textStyle: 'small' | 'medium';
};

export const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  fullPrice,
  textStyle,
}) => {
  return (
    <div className="product-price">
      <p
        className={classNames('product-price__discount', {
          'product-price__discount--is-medium': textStyle === 'medium',
        })}
      >{`$${price}`}</p>

      <p
        className={classNames('product-price__full', {
          'product-price__discount--is-medium': textStyle === 'medium',
        })}
      >{`$${fullPrice}`}</p>
    </div>
  );
};

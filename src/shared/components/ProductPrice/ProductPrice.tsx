import React from 'react';

import './ProductPrice.scss';

type Props = {
  price: number;
  fullPrice?: number;
  className?: string;
};
export const ProductPrice: React.FC<Props> = ({
  price,
  fullPrice,
  className = '',
}) => {
  return (
    <div className={`product-price ${className}`.trim()}>
      <span className="product-price__price product-price__price--current">
        ${price}
      </span>

      {fullPrice && (
        <span className="product-price__price product-price__price--old">
          ${fullPrice}
        </span>
      )}
    </div>
  );
};

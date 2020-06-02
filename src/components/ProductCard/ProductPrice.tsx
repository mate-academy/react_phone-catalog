import React, { useMemo } from 'react';
import cn from 'classnames';

export const ProductPrice = ({ price, discount, styleSize }: ProductPriceProps) => {
  const preparedFullPrice = useMemo(() => (
    price * (discount / 100) + price
  ), [price, discount]);

  return (
    <>
      <span className={cn(
        'product-price', styleSize,
      )}
      >
        {`$${price}`}
      </span>
      {discount > 0 && (
        <span className="product-discount">
          {`$${preparedFullPrice}`}
        </span>
      )}
    </>
  );
};

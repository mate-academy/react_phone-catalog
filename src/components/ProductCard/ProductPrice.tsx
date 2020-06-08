import React, { useMemo } from 'react';
import cn from 'classnames';
import { useRouter } from '../_hooks/useRouter';
import { LOCATIONS } from '../../common/constants';

export const ProductPrice = ({ price, discount, styleSize }: ProductPriceProps) => {
  const { pathname } = useRouter();
  const preparedFullPrice = useMemo(() => (
    price * (discount / 100) + price
  ), [price, discount]);
  const discountVisible = useMemo(
    () => discount > 0 && pathname !== LOCATIONS.cart,
    [discount, pathname]
  );

  return (
    <>
      <span className={cn(
        'product-price', styleSize,
      )}
      >
        {`$${price}`}
      </span>
      {discountVisible && (
        <span className="product-discount">
          {`$${preparedFullPrice}`}
        </span>
      )}
    </>
  );
};

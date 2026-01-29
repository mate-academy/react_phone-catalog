import React from 'react';
import cn from 'classnames';

interface Props {
  fullPrice?: number | null;
  priceDiscount: number | null;
  additionalClass?: string;
  fullPriceClass?: string;
  priceDiscountClass?: string;
}

export const Price: React.FC<Props> = ({
  fullPrice = null,
  priceDiscount,
  additionalClass = '',
  fullPriceClass = '',
  priceDiscountClass = '',
}) => {
  const fullPriceModule =
    fullPrice !== null ? (
      <h3 className={cn('price__full', fullPriceClass)}>{`$${fullPrice}`}</h3>
    ) : (
      ''
    );

  return (
    <div className={cn('price__container', `${additionalClass}`)}>
      <h3 className={cn('price__discount', priceDiscountClass)}>
        {`$${priceDiscount}`}
      </h3>
      {fullPriceModule}
    </div>
  );
};

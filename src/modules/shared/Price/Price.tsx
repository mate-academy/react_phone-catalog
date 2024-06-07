import React from 'react';

type Props = {
  discount: boolean;
  priceDiscount: number;
  fullPrice: number;
};

export const Price: React.FC<Props> = React.memo(
  ({ discount, priceDiscount, fullPrice }) => {
    return discount ? (
      <>
        <span className="price">{`$${priceDiscount}`}</span>{' '}
        <span className="crossed">{`$${fullPrice}`}</span>
      </>
    ) : (
      <p className="price">{`$${fullPrice}`}</p>
    );
  },
);

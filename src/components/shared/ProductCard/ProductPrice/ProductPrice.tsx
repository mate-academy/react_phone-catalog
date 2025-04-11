import './ProductPrice.style.scss';

import React from 'react';
type Props = {
  regularPrice: number;
  discountPrice?: number;
};

export const ProductPrice: React.FC<Props> = ({
  regularPrice,
  discountPrice,
}) => {
  return (
    <>
      {discountPrice ? (
        <div className="price">
          <p className="price__discount">{`$${discountPrice}`}</p>

          <p className="price__regular--crossed">{`$${regularPrice}`}</p>
        </div>
      ) : (
        <p className="price__regular">{`$${regularPrice}`}</p>
      )}
    </>
  );
};

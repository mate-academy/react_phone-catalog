import React from 'react';
import './BlockPrice.scss';

type Props = {
  className: string;
  price: number;
  fullPrice: number;
  showDiscount: boolean;
  sizePrice: number;
};

export const BlockPrice: React.FC<Props> = ({
  className,
  price,
  fullPrice,
  showDiscount,
  sizePrice,
}) => {
  return (
    <div className={`block-price ${className}`}>
      <h3
        className="block-price__price"
        style={{ fontSize: `${sizePrice}px` }}
      >{`$${price}`}</h3>
      {showDiscount && (
        <p className="block-price__price-discount">{`$${fullPrice}`}</p>
      )}
    </div>
  );
};

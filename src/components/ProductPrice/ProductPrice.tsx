import React from 'react';
import './productPrice.scss';

export type Props = {
  discountPrice: number,
  regularPrice: number,
};

export const ProductPrice: React.FC<Props> = ({
  discountPrice,
  regularPrice,
}) => {
  return (
    <div className="price">
      <div className="price__container">
        <p className="price__text price__text_bold">{`$${discountPrice}`}</p>
        <p className="price__text price__text_discount">{`$${regularPrice}`}</p>
      </div>
    </div>
  );
};

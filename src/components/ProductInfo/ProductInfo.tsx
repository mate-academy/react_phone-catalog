import React from 'react';

type Props = {
  name: string;
  value: string;
};

export const ProductInfo: React.FC<Props> = ({ name, value }) => {
  return (
    <div className="product-info product-item__info">
      <span className="product-item__info-titel">{name}</span>
      <span className="product-item__info-description">{value}</span>
    </div>
  );
};

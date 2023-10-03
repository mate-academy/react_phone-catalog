import React from 'react';

type Props = {
  name: string;
  value: string;
};

export const ProductFeature: React.FC<Props> = ({ name, value }) => {
  return (
    <div className="product-info__feature">
      <span className="product-info__feature-name">{name}</span>
      <span
        className="product-info__feature-value"
      >
        {value}
      </span>
    </div>
  );
};

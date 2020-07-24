import React from 'react';
import './ProductInfo.scss';


type Props = {
  title: string;
  value?: string;
};

const ProductInfo: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="ProductInfo">
      <p className="ProductInfo__title">{title}</p>
      <p className="ProductInfo__value">{value}</p>
    </div>
  );
};

export default ProductInfo;

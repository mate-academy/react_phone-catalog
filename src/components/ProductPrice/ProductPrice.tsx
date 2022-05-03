import React from 'react';
import { ProductType } from '../../helpers/types';
import './ProductPrice.scss';

export const ProductPrice: React.FC<ProductType> = ({ product }) => {
  const oldPrice = product.price;
  const newPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="Info-Price">
      <span className="Info-NewPrice">{`$${newPrice}`}</span>
      {newPrice !== oldPrice
        && (
          <s className="Info-OldPrice">{`$${oldPrice}`}</s>
        )}
    </div>
  );
};

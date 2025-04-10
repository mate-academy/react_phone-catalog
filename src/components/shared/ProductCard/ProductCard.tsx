import './ProductCard.scss';

import React from 'react';
import classNames from 'classnames';

import { Product } from '../../../types/Product';


import { ProductCardInfo } from './ProductCardInfo/ProductCardInfo';

type ProductCardProps = {
  product: Product;
  slider?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  slider,
}) => {
  const { image, name} = product;

  return (
    <div
      className={classNames('product product-card', {
        'product product-card--slider': slider,
      })}
    >
      <img className="product__design" src={image} alt={`${name} design`} />

      <ProductCardInfo product={product} />
    </div>
  );
};

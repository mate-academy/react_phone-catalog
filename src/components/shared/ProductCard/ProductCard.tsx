import './ProductCard.scss';

import React from 'react';
import classNames from 'classnames';

import { Product } from '../../../types/Product';


import { ProductCardInfo } from './ProductCardInfo/ProductCardInfo';
import { useNavigate } from 'react-router-dom';
import { routes } from '../Routs/Routs';

type ProductCardProps = {
  product: Product;
  slider?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  slider,
}) => {
  const { image, name, id } = product;
  const navigate = useNavigate();

  const handleProductPageNavigation = () => {
    navigate(`${id}`);

  }

  return (
    <div
    onClick={handleProductPageNavigation}
      className={classNames('product product-card', {
        'product product-card--slider': slider,
      })}
    >
      <img className="product__design" src={image} alt={`${name} design`} />

      <ProductCardInfo product={product} />
    </div>
  );
};

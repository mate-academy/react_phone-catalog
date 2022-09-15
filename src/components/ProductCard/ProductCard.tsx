import React from 'react';

import './ProductCard.scss';
import { NavLink } from 'react-router-dom';
import { CardButtons } from '../CardButtons';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const newPrice = product.discount > 0 ? product.price - ((product.price / 100) * product.discount)
    : product.price;

  return (
    <div className="ProductCard">
      <NavLink to={`/${product.type}s/${product.id}`} className="ProductCard__link"><i className="icon-eye" /></NavLink>
      <div className="ProductCard__img">
        <img src={product.imageUrl} alt="" />
      </div>
      <h3 className="ProductCard__title">{product.name}</h3>
      <div className="ProductCard__price">
        <span className="ProductCard__newPrice">{`$${newPrice}`}</span>
        {product.discount > 0 && <span className="ProductCard__oldPrice">{`$${product.price}`}</span> }
      </div>
      <div className="ProductCard__features">
        <span className="ProductCard__feature-item">
          Screen
          <span className="ProductCard__feature-info">
            {product.screen}
          </span>
        </span>
        <span className="ProductCard__feature-item">
          Capacity
          <span className="ProductCard__feature-info">
            {product.capacity}
          </span>
        </span>
        <span className="ProductCard__feature-item">
          RAM
          <span className="ProductCard__feature-info">
            {product.ram}
          </span>
        </span>
      </div>
      <div className="ProductCard__buttons">
        <CardButtons product={product} size="small" />
      </div>
    </div>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import { AddCartButton } from '../AddCartButton/AddCartButton';
import { AddFavoriteButton } from '../AddFavoriteButton/AddFavoriteButton';

type Props = {
  product: Product,
};

export const ProductCard:React.FC<Props> = ({ product }) => {
  return (
    <div className="products-slider__item">
      <NavLink
        to={`/${product.type}s/${product.id}`}
        className="products-slider__item-link"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <i className="far fa-eye" />
      </NavLink>
      <img src={product.imageUrl} alt={product.name} className="products-slider__item-image" />
      <h2 className="products-slider__item-title">{product.name}</h2>
      <p className="products-slider__item-price">
        <span className="products-slider__item-current-price">{`$${product.newPrice}`}</span>
        {product.price !== product.newPrice && (
          <span className="products-slider__item-old-price">{`$${product.price}`}</span>
        )}
      </p>
      <div className="products-slider__item-info">
        <p className="products-slider__item-info-text">
          Screen
          <span>{product.screen || '-'}</span>
        </p>
        <p className="products-slider__item-info-text">
          Capacity
          <span>{product.capacity || '-'}</span>
        </p>
        <p className="products-slider__item-info-text">
          RAM
          <span>{product.ram || '-'}</span>
        </p>
      </div>
      <div className="products-slider__item-buttons">
        <AddCartButton product={product} />
        <AddFavoriteButton product={product} />
      </div>
    </div>
  );
};

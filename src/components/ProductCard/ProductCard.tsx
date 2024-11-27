import React from 'react';
import './ProductCard.scss';
import { Product } from '../types/Product';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card__content">
        <a className="product-card__link" href="">
          <img
            src={product.image}
            alt="Product logo"
            className="product-card__image"
          />
        </a>
        <a href="" className="product-card__title">
          {product.name}
        </a>
        <p className="product-card__price">{`$${product.price}`}</p>
      </div>

      <div className="product-card__description">
        <p className="product-card__description-item">
          Screen
          <span className="product-card__description-item--value">
            {product.screen}
          </span>
        </p>
        <p className="product-card__description-item">
          Capacity
          <span className="product-card__description-item--value">
            {product.capacity}
          </span>
        </p>
        <p className="product-card__description-item">
          RAM
          <span className="product-card__description-item--value">
            {product.ram}
          </span>
        </p>
      </div>

      <div className="product-card__buttons">
        <button className="product-card__button-cart">Add to cart</button>
        <button className="product-card__button-favs"></button>
      </div>
    </div>
  );
};

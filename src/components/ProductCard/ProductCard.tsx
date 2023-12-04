/* eslint-disable react/button-has-type */
import React from 'react';
import { Product } from '../../types/Product';

import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => (
  <article className="product-cards">
    <img
      src={`./new/${product.image}`}
      alt={product.name}
      className="product-cards__img"
    />

    <div className="product-cards__header">
      <h3 className="product-cards__title">
        {product.name}
      </h3>

      <div className="product-cards__prices">
        <p className="product-cards__new-price">
          {`$${product.price}`}
        </p>

        <p className="product-cards__old-price">
          {`$${product.fullPrice}`}
        </p>
      </div>
    </div>

    <div className="product-cards__separetor" />

    <div className="product-cards__specifications">
      <div className="product-cards__specification">
        <p className="product-cards__specification-title">
          Screen
        </p>

        <p className="product-cards__specification-value">
          {product.screen}
        </p>
      </div>

      <div className="product-cards__specification">
        <p className="product-cards__specification-title">
          Capacity
        </p>

        <p className="product-cards__specification-value">
          {product.capacity}
        </p>
      </div>

      <div className="product-cards__specification">
        <p className="product-cards__specification-title">
          RAM
        </p>

        <p className="product-cards__specification-value">
          {product.ram}
        </p>
      </div>
    </div>

    <div className="product-cards__add-panel">
      <button className="product-cards__btn-cart button button--btn-add-card">
        Add to cart
      </button>

      <button className="product-cards__btn-favorite button">
        <div className="icon icon__favorites" />
      </button>
    </div>
  </article>
);

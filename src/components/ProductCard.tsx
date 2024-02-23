/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

import '../styles/ProductCard.scss';
import { API_URL } from '../utils/api-phones';
import { ButtonsCartFav } from './ButtonsCartFav';
import { Params } from './Params';

interface Props {
  product: Product;
}

const PRODUCT_CARD_PARAMS = ['Screen', 'Capacity', 'RAM'];

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={product.itemId} className="product-card__link">
        <div className="product-card__image-container">
          <img
            className="product-card__image"
            src={`${API_URL}${product.image}`}
            alt="product-pic"
          />
        </div>

        <h3 className="product-card__title">
          {product.name}
        </h3>

        <div className="product-card__prices-container">
          <span className="product-card__price">{`$${product.price}`}</span>
          <span className="product-card__full-price">{`$${product.fullPrice}`}</span>
        </div>

        <Params product={product} params={PRODUCT_CARD_PARAMS} />

      </Link>

      <ButtonsCartFav />
    </div>
  );
};

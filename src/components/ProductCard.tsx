/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';

import '../styles/ProductCard.scss';
import { API_URL } from '../utils/api-phones';

interface Props {
  product: Product
}

const PRODUCT_CARD_PARAMS = ['Screen', 'Capacity', 'RAM'];

export const ProductCard: React.FC<Props> = ({ product }) => {
  // console.log(product);

  return (
    <div className="ProductCard">
      <Link to="/" className="ProductCard__link">
        <div className="ProductCard__image-container">
          <img
            className="ProductCard__image"
            src={`${API_URL}${product.image}`}
            alt="product-pic"
          />
        </div>

        <h3 className="ProductCard__title">
          {product.name}
        </h3>

        <div className="ProductCard__prices-container">
          <span className="ProductCard__price">{`$${product.price}`}</span>
          <span className="ProductCard__full-price">{`$${product.fullPrice}`}</span>
        </div>

        <div className="ProductCard__params-container">
          {PRODUCT_CARD_PARAMS.map(item => (
            <div className="ProductCard__param">
              <span className="ProductCard__param-name">
                {item}
              </span>

              <span className="ProductCard__param-value">
                {product[item.toLowerCase() as keyof Product]}
              </span>
            </div>
          ))}
        </div>

      </Link>

      <div className="ProductCard__buttons">
        <button
          type="button"
          className="ProductCard__button-cart"
        >
          Add to cart
        </button>

        <button
          type="button"
          className="ProductCard__button-favourites"
        />
      </div>

    </div>
  );
};

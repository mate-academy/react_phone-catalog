import React from 'react';
import { Link } from 'react-router-dom';

import './ProductCard.scss';
import { BASE_URL } from '../../api/api';
import { Product } from '../../types/Product';
import { AddToFavButton } from '../AddToFavButton';
import { AddToCartButton } from '../AddToCartButton';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    itemId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  } = product;

  return (
    <div
      data-cy="cardsContainer"
      className="product-card"
    >
      <Link to={`/${product.category}/${itemId}`}>
        <div className="product-card__image">
          <img
            alt="product"
            src={`${BASE_URL}/${image}`}
            className="product-card__image-item"
          />
        </div>
        <div className="product-card__title">
          <h4 className="product-card__title-item">
            {name}
          </h4>
        </div>
      </Link>

      <div className="product-card__price">
        <span className="product-card__price-new">
          {`$${price}`}
        </span>
        <span className="product-card__price-old">
          {`$${fullPrice}`}
        </span>
      </div>

      <div className="product-card__info">
        <div className="product-card__info-container">
          <span className="product-card__info-title">
            Screen
          </span>
          <span className="product-card__info-value">
            {screen}
          </span>
        </div>

        <div className="product-card__info-container">
          <span className="product-card__info-title">
            Capacity
          </span>
          <span className="product-card__info-value">
            {capacity}
          </span>
        </div>

        <div className="product-card__info-container">
          <span className="product-card__info-title">
            RAM
          </span>
          <span className="product-card__info-value">
            {ram}
          </span>
        </div>
      </div>

      <div className="product-card__buttons">
        <AddToCartButton product={product} />
        <AddToFavButton product={product} />
      </div>
    </div>
  );
};

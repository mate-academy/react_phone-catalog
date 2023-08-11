import React, { useContext } from 'react';

import { ApiProduct } from '../../types/ApiProduct';

type Props = {
  product: ApiProduct;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const isReduction = useContext(ReductionContext);

  const {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <div
      className="product-card"
      data-cy="cardsContainer"
    >
      <div className="product-card__container">
        <img
          src={`../${imageUrl}`}
          alt={name}
          className="product-card__image"
        />

        <p className="product-card__name">
          {name}
        </p>
      </div>

      <div className="product-card__container">
        <p className="product-card__price">
          {`$${Math.round(price * (0.1 - discount / 1000)) * 10 - 1}`}

          {isReduction && (
            <span className="product-card__full-price">
              {` $${price - 1}`}
            </span>
          )}
        </p>

        <div className="product-card__line" />

        <div className="product-card__text-box">
          <p className="product-card__param-name">
            Screen
          </p>

          <p className="product-card__param-value">
            {screen}
          </p>
        </div>

        <div className="product-card__text-box">
          <p className="product-card__param-name">
            Capacity
          </p>

          <p className="product-card__param-value">
            {capacity}
          </p>
        </div>

        <div className="product-card__text-box">
          <p className="product-card__param-name">
            RAM
          </p>

          <p className="product-card__param-value">
            {ram}
          </p>
        </div>

        <div className="product-card__interaction-block">
          <button
            className="product-card__cart-button"
            type="button"
          >
            Add to cart
          </button>

          <button
            className="product-card__favourites-button"
            type="button"
          >
            <div
              className="product-card__favourites-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

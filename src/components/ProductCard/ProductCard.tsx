/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import './ProductCard.scss';
import { Product } from '../../types/Product';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const calculateDiscount = (price: number, discount: number) => (
    Math.round(price - price * (discount / 100))
  );

  return (

    <div
      className="cards-container"
      data-cy="cardsContainer"
    >
      <div className="card">
        <div className="card__product-image">
          <img
            src={`${product.imageUrl}`}
            alt=""
            className="product-image"
          />
        </div>

        <h2 className="card__title">
          {product.name}
        </h2>

        {product.discount ? (
          <div className="card__prices">
            <div className="prices prices--discount-price">
              {calculateDiscount(product.price, product.discount)}
            </div>

            <div className="prices prices--initial-price">
              {product.price}
            </div>
          </div>
        ) : (
          <div className="card__prices">
            <div className="prices prices--normal-price">
              {product.price}
            </div>
          </div>
        )}

        <div className="card__details details">
          <div className="details__option row">
            <p className="row__title">Screen</p>

            <div className="row__value">
              {product.screen}
            </div>
          </div>

          <div className="details__option row">
            <p className="row__title">Capacity</p>

            <div className="row__value">
              {product.capacity}
            </div>
          </div>

          <div className="details__option row">
            <p className="row__title">RAM</p>

            <div className="row__value">
              {product.ram}
            </div>
          </div>
        </div>

        <div className="card__buttons buttons">
          <button
            type="button"
            className="buttons__buy-button buy-button"
          >
            Add to card
          </button>

          <button
            type="button"
            className="buttons__buy-button favourites-button"
          />
        </div>
      </div>
    </div>

  );
};

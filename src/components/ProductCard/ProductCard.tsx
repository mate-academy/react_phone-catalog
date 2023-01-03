import React from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const {
    name,
    price,
    discount,
    imageUrl,
    ram,
    screen,
    capacity,
  } = product;

  const currentPrice = discount > 0
    ? price * (1 - discount / 100)
    : price;

  return (
    <div className="product-card">
      <div
        className="product-card__image-container"
      >
        <img
          src={imageUrl}
          alt="phone"
          className="product-card__image"
        />
      </div>
      <h2 className="product-card__title">
        {name}
      </h2>
      <div className="product-card__prices">
        <div
          className="product-card__current-price"
        >
          {`$${currentPrice}`}
        </div>
        <div
          className="product-card__old-price"
        >
          {discount > 0 && `$${price}`}
        </div>
      </div>
      <div className="product-card__divider" />
      <div className="product-card__specs">
        <div className="spec">
          <p className="spec__name">
            Screen
          </p>
          <p className="spec__value">
            {screen}
          </p>
        </div>
        <div className="spec">
          <p className="spec__name">
            Capacity
          </p>
          <p className="spec__value">
            {capacity}
          </p>
        </div>
        <div className="spec">
          <p className="spec__name">
            RAM
          </p>
          <p className="spec__value">
            {ram}
          </p>
        </div>
      </div>
      <div className="product-card__buttons">
        <button
          aria-label="addToCartBtn"
          type="button"
          className="
            product-card__button
            product-card__button--add-to-cart
          "
        >
          Add to cart
        </button>
        <button
          aria-label="addToFavsBtn"
          type="button"
          className="
            product-card__button
            product-card__button--add-to-favs
          "
        />
      </div>
    </div>
  );
};

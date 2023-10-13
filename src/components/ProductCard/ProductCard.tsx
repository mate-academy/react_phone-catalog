import './ProductCard.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { PrimaryButton } from '../PrimaryButton';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    imageUrl, name, price, screen, capacity, ram, discount, id, type,
  } = product;

  const priceWithDiscount = Math.round(price - price * (discount / 100));
  const getPath = () => {
    switch (type) {
      case 'phone':
        return `../phones/${id}`;

      case 'tablet':
        return `../tablets/${id}`;

      case 'accessory':
        return `../accessories/${id}`;

      default:
        return '';
    }
  };

  return (
    <div
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        to={getPath()}
        className="product-card__link"
      >
        <img
          src={imageUrl}
          alt=""
          className="product-card__image"
        />

        <div className="product-card__title">
          {name}
        </div>

        <div className="prices">
          <div className="prices__price">
            {discount ? `$${priceWithDiscount}` : `$${price}`}
          </div>

          {discount > 0 && (
            <div className="prices__price prices__price--discount">
              {`$${price}`}
            </div>
          )}
        </div>

        <div className="line line__card" />

        <div className="product-card__details">
          <div className="product-card__details-row">
            <div className="product-card__details-option">
              Screen
            </div>
            <div className="product-card__details-value">
              {screen}
            </div>
          </div>
          <div className="product-card__details-row">
            <div className="product-card__details-option">
              Capacity
            </div>
            <div className="product-card__details-value">
              {capacity}
            </div>
          </div>
          <div className="product-card__details-row">
            <div className="product-card__details-option">
              RAM
            </div>
            <div className="product-card__details-value">
              {ram}
            </div>
          </div>
        </div>
      </Link>

      <PrimaryButton
        product={product}
      />
    </div>
  );
};

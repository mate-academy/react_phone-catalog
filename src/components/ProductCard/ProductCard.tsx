import React from 'react';

import { getDiscount } from '../../helpers/getDiscount';
import { Product } from '../../types/Product';

import heart from '../../images/heart.svg';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
    imageUrl,
  } = product;

  const discountedPrice = getDiscount(price, discount);

  return (
    <div className="ProductCard">
      <div className="ProductCard__content">
        <div className="ProductCard__photo">
          <img src={imageUrl} alt="product" className="ProductCard__img" />
        </div>

        <div className="ProductCard__title">{name}</div>

        <div className="ProductCard__price">
          <div className="ProductCard__price-normal">{`$${discountedPrice}`}</div>
          {discount > 0 && (
            <div className="ProductCard__price-discounted">{`$${price}`}</div>
          )}
        </div>

        <div className="ProductCard__details">
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">Screen</div>
            <div className="ProductCard__details-item__value">{screen}</div>
          </div>
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">Capacity</div>
            <div className="ProductCard__details-item__value">{capacity}</div>
          </div>
          <div className="ProductCard__details-item">
            <div className="ProductCard__details-item__name">RAM</div>
            <div className="ProductCard__details-item__value">{ram}</div>
          </div>
        </div>

        <div className="ProductCard__buttons">
          <button className="ProductCard__buttons-cart" type="button">
            Add to cart
          </button>
          <button className="ProductCard__buttons-fav" type="button">
            <img src={heart} alt="heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

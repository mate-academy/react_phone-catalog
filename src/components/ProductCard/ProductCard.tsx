import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../helpers/constants';
import { Product } from '../../types/Product';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { ButtonFovourite } from '../ButtonFavourite/ButtonFavourite';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    phoneId,
  } = product;

  const path = `/phones/${product.itemId || product.id}`;

  return (
    <div
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        to={`${path}`}
        className="product-card__img-container"
      >
        <img
          src={`${BASE_URL}${image}`}
          className="product-card__img"
          alt={name}
        />
      </Link>

      <div className="product-card__info">
        <Link
          to={`${phoneId}`}
          className="product-card__name"
        >
          {name}
        </Link>

        <div className="product-card__prices">
          <span className="product-card__discount-price">
            {`$${price}`}
          </span>

          <span className="product-card__start-price">
            {`$${fullPrice}`}
          </span>
        </div>
      </div>

      <div className="product-card__details">
        <div className="product-card__line">
          <span className="product-card__feature">Screen</span>
          <span className="product-card__quantity">{screen}</span>
        </div>

        <div className="product-card__line">
          <span className="product-card__feature">Capacity</span>
          <span className="product-card__quantity">{capacity}</span>
        </div>

        <div className="product-card__line">
          <span className="product-card__feature">RAM</span>
          <span className="product-card__quantity">{ram}</span>
        </div>
      </div>

      <div className="product-card__buttons">
        <AddToCartButton product={product} />

        <ButtonFovourite product={product} />
      </div>
    </div>
  );
};

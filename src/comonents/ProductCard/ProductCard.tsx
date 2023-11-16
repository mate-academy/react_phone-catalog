import { Link, useLocation, useSearchParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import { Product } from '../../type/Product';
import { Button } from '../Button';

import './ProductCard.scss';

type Props = {
  product: Product
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    id,
    price,
    discount,
    screen,
    capacity,
    ram,
    type,
  } = product;

  const priceWithDiscount = useMemo(
    () => price - (price * discount) / 100, [price, discount],
  );
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const link = location.pathname === '/favourites'
    ? `/favourites/${id}`
    : `/${type}s/${id}`;

  return (
    <Link
      to={{
        pathname: link,
      }}
      state={{ search: searchParams.toString() }}
      data-cy="cardsContainer"
      className="product-card"
    >
      <img
        className="product-card__img"
        src={`img/products/${id}.0.jpg`}
        alt={id}
      />
      <div className="product-card__container">
        <p className="text product-card__title">{name}</p>

        <div
          className="product-card__price-container"
        >
          <h2 className="text text--h2">
            {`$${priceWithDiscount}`}
          </h2>
          {discount > 0 && (
            <h2
              className="text text--h2-strikethrough"
            >
              {`$${price}`}
            </h2>
          )}
        </div>

        <div className="product-card__info-container">
          <div className="container">
            <p className="text text--small text--gray">
              Screen
            </p>
            <p className="text text--small">{screen}</p>
          </div>

          <div className="container">
            <p className="text text--small text--gray">
              Capacity
            </p>
            <p className="text text--small">{capacity}</p>
          </div>

          <div className="container">
            <p className="text text--small text--gray">
              RAM
            </p>
            <p className="text text--small">{ram}</p>
          </div>
        </div>

        <Button
          name="cart"
          product={product}
        />
      </div>
    </Link>
  );
};

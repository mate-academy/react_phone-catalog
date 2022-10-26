/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
// import classNames from 'classnames';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { FavoriteButton } from '../FavoriteButton';
import { BuyButton } from '../BuyButton';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({
  product,
}) => {
  const calculateDiscount = (price: number, discount: number) => (
    Math.round(price - price * (discount / 100))
  );

  const getLink = (targetProduct: Product) => {
    switch (targetProduct.type) {
      case 'phone':
        return `../phones/${targetProduct.id}`;
      case 'tablet':
        return `../tablets/${targetProduct.id}`;
      case 'accessories':
        return `../accessories/${targetProduct.id}`;
      default:
        return '';
    }
  };

  return (

    <div
      className="cards-container"
      data-cy="cardsContainer"
    >
      <div className="card">
        <Link
          to={getLink(product)}
          className="card__product-link"
        >
          <div className="card__product-image">
            <img
              src={`${product.imageUrl}`}
              alt="product"
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

        </Link>

        <div className="card__buttons buttons">
          <BuyButton
            product={product}
            inDetails={false}
          />

          <FavoriteButton
            product={product}
            inDetails={false}
          />
        </div>
      </div>
    </div>
  );
};

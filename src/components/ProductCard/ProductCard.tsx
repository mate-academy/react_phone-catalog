import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { Product } from '../../types/Product';
import { CartButton } from '../CartButton/CartButton';
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const newPrice = product.discount > 0
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <div
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        to={`/${product.type}s/${product.id}`}
        className="product-card__content"
      >
        <img
          className="product-card__photo"
          src={product.imageUrl}
          alt={product.name}
        />

        <p className="product-card__name">
          {product.name}
        </p>

        <div className="product-card__prices">
          <span className="product-card__new-price">
            {`$${newPrice}`}
          </span>

          {product.discount > 0 && (
            <span className="product-card__old-price">
              {`$${product.price}`}
            </span>
          )}
        </div>

        <div className="product-card__characteristics">
          <div className="product-card__characteristic">
            <span className="product-card__characteristic-name">Screen</span>
            <span className="product-card__characteristic-value">
              {product.screen}
            </span>
          </div>

          <div className="product-card__characteristic">
            <span className="product-card__characteristic-name">Capacity</span>
            <span className="product-card__characteristic-value">
              {product.capacity}
            </span>
          </div>

          <div className="product-card__characteristic">
            <span className="product-card__characteristic-name">RAM</span>
            <span className="product-card__characteristic-value">
              {product.ram}
            </span>
          </div>
        </div>
      </Link>

      <div className="product-card__buttons-wrapper">
        <CartButton product={product} />

        <FavoriteButton product={product} />
      </div>
    </div>
  );
};

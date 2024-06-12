import React from 'react';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../helpers/types/Product';
import { ProductButtons } from '../ProductButtons';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { fullPrice, price, image, name, itemId, screen, ram, capacity } =
    product;

  return (
    <Link to={`/product/${itemId}`} className="product-card__link">
      <article className="product-card" data-cy="cardsContainer">
        <img
          src={`./_new/${image}`}
          alt={`${name} img`}
          className="product-card__img"
        />
        <h3 className="product-card__title">{name}</h3>
        <div className="product-card__prices">
          <h2 className="product-card__current-price">{`$${price}`}</h2>
          {price < fullPrice && (
            <h2 className="product-card__fool-price">{`$${fullPrice}`}</h2>
          )}
        </div>

        <div className="product-card__characteristics">
          <h4 className="product-card__characteristics-name">Screen</h4>
          <span className="product-card__characteristics-value">
            {screen || '-'}
          </span>
          <h4 className="product-card__characteristics-name">Capacity</h4>
          <span className="product-card__characteristics-value">
            {capacity || '-'}
          </span>
          <h4 className="product-card__characteristics-name">RAM</h4>
          <span className="product-card__characteristics-value">
            {ram || '-'}
          </span>
        </div>

        <div className="product-card__buttons">
          <ProductButtons id={itemId} name={name} price={price} image={image} />
        </div>
      </article>
    </Link>
  );
};

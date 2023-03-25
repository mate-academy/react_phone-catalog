import React from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductButtons } from '../ProductButtons/ProductButtons';
import { BadgeEye } from '../BadgeEye/BadgeEye';

import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    category,
    phoneId,
    image,
    name,
    price,
    fullPrice,
  } = product;

  return (
    <div className="product-card">
      <NavLink
        to={`/${category}/${phoneId}`}
        className="product-card__link"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <BadgeEye />
      </NavLink>

      <img
        src={`_new/${image}`}
        alt={name}
        className="product-card__image"
      />

      <h2 className="product-card__title">{name}</h2>

      <p className="product-card__price">
        <span className="product-card__current-price">
          {`$${price}`}
        </span>

        {price !== fullPrice && (
          <span className="product-card__old-price">
            {`$${fullPrice}`}
          </span>
        )}
      </p>

      <div className="product-card__info">
        <p className="product-card__info-text">
          Screen
          <span>{product.screen || '-'}</span>
        </p>
        <p className="product-card__info-text">
          Capacity
          <span>{product.capacity || '-'}</span>
        </p>
        <p className="product-card__info-text">
          RAM
          <span>{product.ram || '-'}</span>
        </p>
      </div>
      <ProductButtons
        product={product}
      />
    </div>
  );
};

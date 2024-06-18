import React from 'react';
import { Product } from '../../types/Product';
import { Link, useLocation } from 'react-router-dom';
import './ProductCard.scss';
import { ProductButtons } from '../ProductButtons';

type Props = {
  product: Product | null;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const location = useLocation();

  return (
    <div className="product-card">
      {product !== null ? (
        <>
          <Link
            to={`/${product.category}/${product.itemId}`}
            state={{ pathname: location.pathname + location.search }}
            className="product-card__link"
          >
            <img
              src={product.image}
              alt="Product image"
              className="product-card__image"
            />
            <p className="product-card__name">{product.name}</p>
          </Link>
          <div className="product-card__prices">
            <p className="product-card__price">${product.price}</p>
            <p className="product-card__price product-card__price--full-price">
              ${product.fullPrice}
            </p>
          </div>
          <div className="product-card__divider"></div>
          <div className="product-card__details">
            <div className="product-card__detail">
              <p className="product-card__detail-name">Screen</p>
              <p className="product-card__detail-value">{product.screen}</p>
            </div>

            <div className="product-card__detail">
              <p className="product-card__detail-name">Capacity</p>
              <p className="product-card__detail-value">{product.capacity}</p>
            </div>

            <div className="product-card__detail">
              <p className="product-card__detail-name">RAM</p>
              <p className="product-card__detail-value">{product.ram}</p>
            </div>
          </div>
          <ProductButtons product={product} />
        </>
      ) : (
        <div className="product-card__skeleton">
          <div
            className="
              product-card__image
              product-card__image--placeholder
            "
          >
            <div className="product-card__loader"></div>
          </div>

          <div
            className="
            product-card__text-placeholder
            "
          ></div>

          <div
            className="
            product-card__text-placeholder
            product-card__text-placeholder--size--short
            "
          ></div>

          <div
            className="
            product-card__text-placeholder
            product-card__text-placeholder--size--high
            "
          ></div>

          <div className="product-card__divider"></div>

          <div
            className="
            product-card__text-placeholder
            product-card__text-placeholder--size--low
            "
          ></div>

          <div
            className="
            product-card__text-placeholder
            product-card__text-placeholder--size--low
            "
          ></div>

          <div
            className="
            product-card__text-placeholder
            product-card__text-placeholder--size--low
            "
          ></div>

          <ProductButtons />
        </div>
      )}
    </div>
  );
};

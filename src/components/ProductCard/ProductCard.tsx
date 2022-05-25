import classNames from 'classnames';
import React, { useState } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product }) => {
    const [isAddedToFovourite, setIsAddedToFovourite] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    return (
      <div className="product-card">
        <div className="product-card__image-box">
          <img
            src={product.imageUrl}
            alt="phone"
            className="product-card__image"
          />
        </div>
        <h3 className="product-card__title">
          {product.name}
        </h3>
        <div className="product-card__price-block">
          {product.discount
            ? (
              <>
                <span
                  className="product-card__price"
                >
                  {product.price - product.price / product.discount}
                  $
                </span>
                <span
                  className="product-card__price product-card__price--is-old"
                >
                  {product.price}
                  $
                </span>
              </>
            ) : (
              <span
                className="product-card__price "
              >
                {product.price}
                $
              </span>
            )}

        </div>
        <ul className="product-card__description">
          <li className="product-card__description-item">
            <span className="product-card__char">Screen</span>
            <span className="product-card__value">
              {product.screen || '-'}
            </span>
          </li>
          <li className="product-card__description-item">
            <span className="product-card__char">Capacity</span>
            <span className="product-card__value">
              {product.capacity || '-'}
            </span>
          </li>
          <li className="product-card__description-item">
            <span className="product-card__char">RAM</span>
            <span className="product-card__value">
              {product.ram || '-'}
            </span>
          </li>
        </ul>
        <div className="product-card__control-block">
          <button
            type="button"
            className={classNames(
              'button',
              'product-card__button',
              { 'button--is-active': isAddedToCart },
            )}
            onClick={() => {
              setIsAddedToCart(curr => !curr);
            }}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="
              product-card__button
              product-card__button--is-transparent"
            onClick={() => {
              setIsAddedToFovourite(curr => !curr);
            }}
          >
            <div className="icon-box product-card__icon-box icon-box--is-big">
              <span className={classNames(
                'icon',
                'icon--heart',
                { 'icon--heart-selected': isAddedToFovourite },
              )}
              />
            </div>
          </button>
        </div>
      </div>
    );
  },
);

/* eslint-disable max-len */

import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../types/Phone';
import '../styles/App.scss';
import '../styles/ProductCard.scss';
import { getPrevPrice } from '../utils/getPrevPrice';
import { LocaleDataTypes, isAdded, setFavorite } from '../utils/localeStorage';
import { RedHeart, WhiteHeart } from '../utils/Icons';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const location = useLocation();

  const {
    capacity,
    discount,
    id,
    // imageUrl,
    name,
    price,
    ram,
    screen,
    // type,
  } = product;

  const [isFavorite, setIsFavorite] = useState<boolean>(isAdded(id, LocaleDataTypes.FAVORITES));
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(isAdded(id, LocaleDataTypes.CART));

  return (
    <article data-cy="cardsContainer" className="browse-products__product product-card">
      <div className="product__wrapper">
        <img
          className="product-card__product--image"
          src="https://placehold.co/208x208/png"
          alt={`${name}`}
        />
        <div className="product-card--info">
          <Link
            to={`${location.pathname}/${id}`}
            className="product-card--name"
          >
            {name}
          </Link>
          <div className="product-card--price">
            <h3 className="product-card--new-price">
              {`$${price}`}
            </h3>
            {discount !== 0 && (
              <p className="product-card--old-price">
                {`$${getPrevPrice(price, discount)}`}
              </p>
            )}
          </div>
        </div>
        <div className="product-card--features">
          <div className="product-card--feature">
            <h4 className="product-card--feature-title">Screen</h4>
            <p className="product-card--feature-value">{screen}</p>
          </div>
          <div className="product-card--feature">
            <p className="product-card--feature-title">Capacity</p>
            <p className="product-card--feature-value">
              {capacity}
            </p>
          </div>
          <div className="product-card--feature">
            <p className="product-card--feature-title">RAM</p>
            <p className="product-card--feature-value">{ram}</p>
          </div>
        </div>
        <div className="product-card--buttons">
          <button
            type="button"
            className={`product-card--add-to-cart${classNames({ '--added': isAddedToCart })}`}
            onClick={() => {
              setFavorite(id, LocaleDataTypes.CART);
              setIsAddedToCart(!isAdded(id, LocaleDataTypes.CART));
            }}
          >
            {isAddedToCart ? 'Added to cart' : 'Add to cart'}
            {/* Add to cart */}
          </button>
          <button
            type="button"
            className="product-card--add-to-favorites"
            onClick={() => {
              setFavorite(id, LocaleDataTypes.FAVORITES);
              setIsFavorite(!isAdded(id, LocaleDataTypes.FAVORITES));
            }}
          >
            {isFavorite ? <RedHeart /> : <WhiteHeart />}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

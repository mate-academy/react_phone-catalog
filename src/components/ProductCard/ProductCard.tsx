import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/fetchClient';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    category,
    itemId,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <Link to={`${category}/${itemId}`} className="ProductCard">
      <div className="ProductCard__content">
        <div className="ProductCard__image-container">
          <img
            src={`${BASE_URL}/${image}`}
            alt={name}
            className="ProductCard__image"
          />
        </div>
        <div className="ProductCard__info">
          <h2 className="ProductCard__name">
            {name}
          </h2>
          <div className="ProductCard__prices">
            <span className="ProductCard__new-price">
              &#36;
              {price}
            </span>
            <span className="ProductCard__full-price">
              &#36;
              {fullPrice}
            </span>
          </div>
          <div className="ProductCard__line" />
        </div>
        <ul className="ProductCard__features">
          <li className="ProductCard__feature">
            <span className="ProductCard__feature-name">
              Screen
            </span>
            <span className="ProductCard__feature-value">
              {screen}
            </span>
          </li>

          <li className="ProductCard__feature">
            <span className="ProductCard__feature-name">
              Capacity
            </span>
            <span className="ProductCard__feature-value">
              {capacity}
            </span>
          </li>

          <li className="ProductCard__feature">
            <span className="ProductCard__feature-name">
              RAM
            </span>
            <span className="ProductCard__feature-value">
              {ram}
            </span>
          </li>
        </ul>

        <div className="ProductCard__buttons">
          <button
            type="button"
            className="ProductCard__add-to-card"
          >
            Add to card
          </button>
          <button
            type="button"
            aria-label="Like"
            className="button button--like"
          />
        </div>
      </div>
    </Link>
  );
};

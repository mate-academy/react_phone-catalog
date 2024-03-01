import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { BASE_URL } from '../../helpers/constants';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <Link
      to="/home"
      className="product-card"
      data-cy="categoryLinksContainer"
    >
      <div className="product-card__content">
        {/* <img src={`${BASE_URL}${image}`} alt={name} className="product-card__image" /> */}
        {/* <div className="product-card__image-container"></div> */}
        <div className="product-card__image-container"><img src={`${BASE_URL}${image}`} alt={name} className="product-card__image" /></div>
        <p className="product-card__title">{name}</p>
        <div className="product-card__price-container">
          <h3 className="product-card__price">{`$${price}`}</h3>
          {price !== fullPrice && (
            <p className="product-card__full-price">{`$${fullPrice}`}</p>
          )}
        </div>
        <ul className="product-card__specs">
          <li className="product-card__spec">
            <p className="product-card__spec-title">Screen</p>
            <p className="product-card__spec-value">
              {screen.replace("'", '"')}
            </p>
          </li>
          <li className="product-card__spec">
            <p className="product-card__spec-title">Capacity</p>
            <p className="product-card__spec-value">{capacity}</p>
          </li>
          <li className="product-card__spec">
            <p className="product-card__spec-title">RAM</p>
            <p className="product-card__spec-value">{ram}</p>
          </li>
        </ul>
        <div className="product-card__buttons">
          <button
            type="button"
            className="product-card__primary-button button" // button--selected
          >
            Add to cart
          </button>
          <button
            type="button"
            className="product-card__fav-button" // product-card__fav-button--selected
          >
            <div className="icon icon--favorites" />
            {/* icon--selected-favorites */}
          </button>
        </div>
      </div>
    </Link>
  );
};

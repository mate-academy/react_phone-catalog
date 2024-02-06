import React from 'react';
import { Link } from 'react-router-dom';

import { Phone } from '../../types/Phone';

import './ProductItem.scss';

type Props = {
  product: Phone
};

export const ProductItem: React.FC<Props> = ({
  product,
}) => {
  const {
    image,
    phoneId,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;

  return (
    <div className="product-item">
      <div className="product-item__img">
        <img src={`_new/${image}`} alt={phoneId} />
      </div>

      <Link to="./" className="product-item__title body-text">
        {name}
      </Link>

      <div className="product-item__price-section">
        <h2 className="product-item__full-price">
          {`$${price}`}
        </h2>

        <p className="product-item__price">
          {`$${fullPrice}`}
        </p>
      </div>

      <hr className="product-item__line" />

      <div className="product-item__descr">
        <div className="product-item__descr-wrapper">
          <p className="product-item__descr-name">
            Screen
          </p>

          <p className="product-item__descr-value">
            {screen}
          </p>
        </div>

        <div className="product-item__descr-wrapper">
          <p className="product-item__descr-name">
            Capacity
          </p>

          <p className="product-item__descr-value">
            {capacity}
          </p>
        </div>

        <div className="product-item__descr-wrapper">
          <p className="product-item__descr-name">
            RAM
          </p>

          <p className="product-item__descr-value">
            {ram}
          </p>
        </div>
      </div>

      <div className="product-item__btns">
        <button
          type="button"
          className="button button__primary button--large"
        >
          Add to card
        </button>

        <button
          type="button"
          className="button button__like button--medium button__like--active"
        >
          <img src="_new/img/icons/heart.svg" alt="Heart" />
        </button>
      </div>
    </div>
  );
};

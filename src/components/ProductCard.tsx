/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../types/Phone';

export const path = process.env.PUBLIC_URL;

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const imagePath = `${path}_new/${phone.image}`;

  return (
    <Link
      to={`/Phones/${phone.id}`}
      className="product-card"
      data-cy="cardsContainer"
    >
      <div className="product-card__picture">
        <img
          className="product-image"
          src={imagePath}
          alt={phone.phoneId}
        />
      </div>
      <div className="product-info-wrapper">
        <div className="product-card__title">
          <span>{phone.name}</span>
        </div>
        <div className="product-price ">
          <div className="product-price__regular">
            $
            {phone.price}
          </div>
          {phone.year !== 2019 && (
            <div className="product-price__full">
              $
              {phone.fullPrice}
            </div>
          )}
        </div>
        <div className="product-card__details">
          <div className="info-block">
            <div className="info-block__title">Screen</div>
            <div className="info-block__value">{phone.screen}</div>
          </div>
          <div className="info-block">
            <div className="info-block__title">Capacity</div>
            <div className="info-block__value">{phone.capacity}</div>
          </div>
          <div className="info-block">
            <div className="info-block__title">RAM</div>
            <div className="info-block__value">{phone.ram}</div>
          </div>
        </div>
        <div className="card-button">
          <button
            className="card-button__add"
            type="button"
            onClick={(event) => event.preventDefault()}
          >
            Add to cart
          </button>
          <button
            className="card-button__favourite"
            type="button"
            onClick={(event) => event.preventDefault()}
          />
        </div>
      </div>
    </Link>
  );
};

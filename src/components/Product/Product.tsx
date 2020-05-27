import React from 'react';

export const Product = ({
  name, imageUrl, price, screen, capacity, ram, discount, id, productCard,
}: ProductProps) => {
  const preparedScreen = screen.replace(' inches', '"');
  const preparedFullPrice = price * (discount / 100) + price;
  const preparedCapacity = `${parseInt((capacity || '32000'), 10)} MB`;
  const preparedRam = `${parseInt((ram || '1000'), 10)} MB`;

  return (
    <article
      className="product"
      ref={productCard}
    >
      <img className="product__image" src={imageUrl} alt={name} />
      <p className="product__title">{name}</p>
      <div className="product__price-container">
        <span className="product__price">
          $
          {price}
        </span>
        {discount > 0 && (
          <span className="product__discount">
            $
            {preparedFullPrice}
          </span>
        )}
      </div>
      <div className="product__split-line" />
      <div className="product__details">
        <div className="product__details-container">
          <span className="product__details-title">
            Screen
          </span>
          <span className="product__details-info">
            {preparedScreen}
          </span>
        </div>
        <div className="product__details-container">
          <span className="product__details-title">
            Capacity
          </span>
          <span className="product__details-info">
            {preparedCapacity}
          </span>
        </div>
        <div className="product__details-container">
          <span className="product__details-title">
            RAM
          </span>
          <span className="product__details-info">
            {preparedRam}
          </span>
        </div>
      </div>
      <div className="product__buttons__container">
        <button className="product__button" type="button">
          Add to cart
        </button>
        <label
          className="product__button-favorite"
          htmlFor={`button-favorite-${id}`}
        >
          <input
            className="product__button-favorite-input"
            type="checkbox"
            id={`button-favorite-${id}`}
          />
          <span className="product__button-favorite-checkmark" />
        </label>
      </div>
    </article>
  );
};

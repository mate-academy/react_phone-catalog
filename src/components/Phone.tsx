import React from 'react';

export const Phone = ({
  name, imageUrl, price, screen, capacity, ram, discount, id,
}: Phone) => {
  return (
    <article className="phone">
      <img className="phone__image" src={imageUrl} alt={name} />
      <p className="phone__title">{name}</p>
      <div className="phone__price-container">
        <span className="phone__price">
          $
          {price}
        </span>
        <span className="phone__discount">
          $
          {price * (discount / 100) + price}
        </span>
      </div>
      <div className="phone__split-line" />
      <div className="phone__details">
        <div className="phone__details-container">
          <span className="phone__details-title">Screen</span>
          <span className="phone__details-info">{screen}</span>
        </div>
        <div className="phone__details-container">
          <span className="phone__details-title">Capacity</span>
          <span className="phone__details-info">
            {`${parseInt(capacity, 10)} MB`}
          </span>
        </div>
        <div className="phone__details-container">
          <span className="phone__details-title">RAM</span>
          <span className="phone__details-info">
            {`${parseInt(ram, 10)} MB`}
          </span>
        </div>
      </div>
      <div className="phone__buttons__container">
        <button className="phone__button" type="button">Add to cart</button>
        <label
          className="phone__button-favorite"
          htmlFor={`button-favorite-${id}`}
        >
          <input
            className="phone__button-favorite-input"
            type="checkbox"
            id={`button-favorite-${id}`}
          />
          <span className="phone__button-favorite-checkmark" />
        </label>
      </div>
    </article>
  );
};

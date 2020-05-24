import React, { FC } from 'react';

export const Phone: FC<Phone> = ({
  name, imageUrl, price, screen, capacity, ram, discount, id,
}) => {
  return (
    <article className="phone">
      <img className="phone__image" src={imageUrl} alt={name} />
      <p className="phone__title">{name}</p>
      <div className="phone__price-container">
        <h2 className="phone__price">
          $
          {price}
        </h2>
        <span className="phone__discount">
          $
          {discount}
        </span>
      </div>
      <div className="phone__details">
        <div className="phone__details-container">
          <p>Screen</p>
          <p>{screen}</p>
        </div>
        <div className="phone__details-container">
          <p>Capacity</p>
          <p>{`${parseInt(capacity, 10)} MB`}</p>
        </div>
        <div className="phone__details-container">
          <p>RAM</p>
          <p>{`${parseInt(ram, 10)} MB`}</p>
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

import React, { FC } from 'react';

export const Phone: FC<Phone> = ({ name, imageUrl, price, screen, capacity, ram, discount }) => {
  return (
    <article className="phone">
      <img className="phone__image" src={imageUrl} alt={name} />
      <p className="phone__title">{name}</p>
      <div className="phone__price-container">
        <h2 className="phone__price">${price}</h2>
        <span className="phone__discount">${discount}</span>
      </div>
      <div className="phone__details">
        <div className="phone__details-container">
          <p>Screen</p>
          <p>{screen}</p>
        </div>
        <div className="phone__details-container">
          <p>Capacity</p>
          <p>{`${parseInt(capacity)} MB`}</p>
        </div>
        <div className="phone__details-container">
          <p>RAM</p>
          <p>{`${parseInt(ram)} MB`}</p>
        </div>
      </div>
      <div className="phone__buttons__container">
        <button className="phone__button" type="button">Add to cart</button>
        <input
          className="phone__button-favorite-input"
          type="checkbox"/>
        <label className="phone__button-favorite"></label>
      </div>
    </article>
  );
}

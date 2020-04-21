import React, { FC } from 'react';
import './Phones.scss';

interface Props {
  phone: Phone;
}

export const Phone: FC<Props> = ({ phone }) => (
  <div className="card">
    <img
      src={phone.image}
      alt={phone.phoneId}
      className="card__image"
    />
    <p className="card__phone-name">
      {phone.name}
    </p>
    <h2 className="card__price">
      <span className="card__new-price">
        $
        {phone.priceDiscount}
      </span>
      <span className="card__old-price">
        $
        {phone.priceRegular}
      </span>
    </h2>
    <div className="phone-specs">
      <p className="phone-specs__item">
        <span className="phone-specs__name">Screen</span>
        <span className="phone-specs__value">{phone.screen}</span>
      </p>
      <p className="phone-specs__item">
        <span className="phone-specs__name">Capacity</span>
        <span className="phone-specs__value">{phone.capacity}</span>
      </p>
      <p className="phone-specs__item">
        <span className="phone-specs__name">RAM</span>
        <span className="phone-specs__value">{phone.ram}</span>
      </p>
    </div>
    <div className="card__buttons">
      <button
        type="button"
        className="card__add"
      >
        Add to cart
      </button>
      <button type="submit" className="card__likes">
        <img src="img/Icons/heart.svg" alt="heart"/>
      </button>
    </div>
  </div>
);

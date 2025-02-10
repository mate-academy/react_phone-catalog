import React from 'react';
import './PhoneCard.scss';

import { Phone } from '../../../types/Phone';

type PhoneCardProps = {
  phone: Phone;
}

export const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  const {
    images,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
  } = phone;

  return (
    <div className="phone phone-card">
      <img
        className="phone__design"
        src={images[0]}
        alt={`${name} design`}
      />

      <p className="phone__name">{`${name}(iMT9G2FS/A)`}</p>

      <div className="price phone__price">
        <p className="price--regular">{priceRegular}</p>
        <p className="price--discount">{priceDiscount}</p>
      </div>

      <div className="details phone__details">
        <div className="details__wrap">
          <p className="details__title">Screen</p>
          <p className="details__info">{screen}</p>
        </div>

        <div className="details__wrap">
          <p className="details__title">Capacity</p>
          <p className="details__info">{capacity}</p>
        </div>

        <div className="details__wrap">
          <p className="details__title">RAM</p>
          <p className="details__info">{ram}</p>
        </div>
      </div>

      <div className="buttons phone-card__buttons">
        <button type="button" className="buttons__add-to-cart">
          Add to cart
        </button>

        <button type="button" className="buttons__add-to-fav"></button>
      </div>
    </div>
  );
};

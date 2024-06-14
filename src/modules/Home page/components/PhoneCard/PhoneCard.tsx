import React from 'react';
import { PhoneType } from '../../../../types/PhoneType';
import './PhoneCard.scss';

interface Props {
  phone: PhoneType;
  isHot?: boolean;
}

export const PhoneCard: React.FC<Props> = ({ phone, isHot }) => {
  return (
    <article className="phone-card">
      <div className="phone-card__image-wrapper">
        <img
          src={phone.images[0]}
          alt={phone.namespaceId}
          className="phone-card__image"
        />
      </div>
      <h2 className="phone-card__title">{phone.name}</h2>
      <p className="phone-card__price">
        ${phone.priceRegular}
        {isHot && (
          <span className="phone-card__price--hot">${phone.priceDiscount}</span>
        )}
      </p>
      <div className="phone-card__specs">
        <div className="phone-card__spec">
          <span className="phone-card__spec-label">Screen</span>
          <span className="phone-card__spec-value">{phone.screen}</span>
        </div>
        <div className="phone-card__spec">
          <span className="phone-card__spec-label">Capacity</span>
          <span className="phone-card__spec-value">{phone.capacity}</span>
        </div>
        <div className="phone-card__spec">
          <span className="phone-card__spec-label">RAM</span>
          <span className="phone-card__spec-value">{phone.ram}</span>
        </div>
      </div>
      <div className="phone-card__buttons">
        <button className="phone-card__button">Add to cart</button>
        <button className="icon icon--favourites--button">
          <img src="nav/favourites.svg" alt="favourites" />
        </button>
      </div>
    </article>
  );
};

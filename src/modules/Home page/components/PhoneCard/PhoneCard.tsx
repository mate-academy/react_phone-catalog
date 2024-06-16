import React from 'react';
import './PhoneCard.scss';
import { ProductType } from '../../../../types/ProductType';

interface Props {
  phone: ProductType;
  isHot?: boolean;
}

export const PhoneCard: React.FC<Props> = ({ phone, isHot }) => {
  return (
    <article className="phone-card">
      <div className="phone-card__container">
        <div className="phone-card__image-wrapper">
          <img
            src={phone.image}
            alt={phone.itemId}
            className="phone-card__image"
          />
        </div>
        <h2 className="phone-card__title">{phone.name}</h2>
        <p className="phone-card__price">
          ${phone.price}
          {isHot && (
            <span className="phone-card__price--hot">${phone.fullPrice}</span>
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

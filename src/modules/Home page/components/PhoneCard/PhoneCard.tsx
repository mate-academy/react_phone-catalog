import React from 'react';
import { Phone } from '../../../../types/Phone';
import './PhoneCard.scss';

interface Props {
  phone: Phone;
  isHot?: boolean;
}

export const PhoneCard: React.FC<Props> = ({ phone, isHot }) => {
  const { name, images } = phone;

  return (
    <article className="phone-card">
      <div className="phone-card__image-wrapper">
        <img
          src={images[0]}
          alt="Apple iPhone 14 Pro"
          className="phone-card__image"
        />
      </div>
      <h2 className="phone-card__title">{name}</h2>
      <p className="phone-card__price">
        $999
        {isHot && <span className="phone-card__price--hot">$1199</span>}
      </p>
      <div className="phone-card__specs">
        <div className="phone-card__spec">
          <span className="phone-card__spec-label">Screen</span>
          <span className="phone-card__spec-value">6.1” OLED</span>
        </div>
        <div className="phone-card__spec">
          <span className="phone-card__spec-label">Capacity</span>
          <span className="phone-card__spec-value">128 GB</span>
        </div>
        <div className="phone-card__spec">
          <span className="phone-card__spec-label">RAM</span>
          <span className="phone-card__spec-value">6 GB</span>
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

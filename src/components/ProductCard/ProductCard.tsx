import { Phone } from '../../types/phone';
import './ProductCard.scss';
import Favorites from '../../images/homePage/Favorites.svg';
import React from 'react';

type Props = {
  phone: Phone;
  brand?: boolean;
};

export const ProductCard: React.FC<Props> = ({ phone, brand }) => {
  return (
    <div className="card" data-cy="cardsContainer">
      <div className="card__url">
        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${phone.image}`}
          alt={phone.category}
          className="card__img"
        />
      </div>
      <div className="card__details">
        <div className="card__header">
          <div className="card__name">{phone.name}</div>
          <div className="card__price">
            {brand ? (
              <div className="card__price__discount">${phone.fullPrice}</div>
            ) : (
              <>
                <div className="card__price__discount">${phone.price}</div>
                <div className="card__price__no-discount">
                  ${phone.fullPrice}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="card__line"></div>
        <div className="card__discription">
          <div className="card__center">
            <div className="card__screen-name">Screen</div>
            <div className="card__screen">{phone.screen}</div>
          </div>
          <div className="card__center">
            <div className="card__capacity-name">Capacity</div>
            <div className="card__capacity">{phone.capacity}</div>
          </div>
          <div className="card__center">
            <div className="card__ram-name">RAM</div>
            <div className="card__ram">{phone.ram}</div>
          </div>
        </div>
        <div className="card__buttons">
          <button className="card__buttons__add">Add to cart</button>
          <button className="card__buttons__favorite">
            <img
              src={Favorites}
              alt="favorites"
              className="card__buttons__heart"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

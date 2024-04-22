import { TabAccess } from '../../types/tablets';
import './PhoneTabAccessCard.scss';
import Favorites from '../../images/homePage/Favorites.svg';
import React from 'react';

type Props = {
  item: TabAccess;
};

export const PhoneTabAccessCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="phone">
      <div className="phone__url">
        <img
          src={Object.values(item.images)[1]}
          alt={item.category}
          className="phone__img"
        />
      </div>
      <div className="phone__details">
        <div className="phone__header">
          <div className="phone__name">{item.name}</div>
          <div className="phone__price">
            <div className="phone__price__discount">${item.priceDiscount}</div>
            <div className="phone__price__no-discount">
              ${item.priceRegular}
            </div>
          </div>
        </div>
        <div className="phone__line"></div>
        <div className="phone__discription">
          <div className="phone__center">
            <div className="phone__screen-name">Screen</div>
            <div className="phone__screen">{item.screen}</div>
          </div>
          <div className="phone__center">
            <div className="phone__capacity-name">Capacity</div>
            <div className="phone__capacity">{item.capacity}</div>
          </div>
          <div className="phone__center">
            <div className="phone__ram-name">RAM</div>
            <div className="phone__ram">{item.ram}</div>
          </div>
        </div>
        <div className="phone__buttons">
          <button className="phone__buttons__add">Add to cart</button>
          <button className="phone__buttons__favorite">
            <img
              src={Favorites}
              alt="favorites"
              className="phone__buttons__heart"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

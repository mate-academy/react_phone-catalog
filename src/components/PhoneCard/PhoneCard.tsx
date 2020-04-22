import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './PhoneCard.css';

import { MAIN_URL } from '../../utils/constants';
import { ButtonAddToCart } from '../ButtonAddToCart/ButtonAddToCart';
import {
  ButtonAddToFavourite,
} from '../ButtonAddToFavourite/ButtonAddToFavourite';

interface Props {
  phone: PhonesWithDetails;
}

export const PhoneCard: FC<Props> = ({ phone }) => (
  <div className="card catalog__card">
    <NavLink
      to={`/phones/${phone.phoneId}`}
      exact
    >
      <img
        src={`${MAIN_URL}${phone.image}`}
        alt="phone_image"
        className="card__image"
      />
    </NavLink>
    <NavLink
      to={`/phones/${phone.phoneId}`}
      className="card__heading"
      exact
    >
      {phone.name}
    </NavLink>
    <div>
      <span className="card__price price-discount">
        {`$${phone.priceDiscount}`}
      </span>
      <span className="card__price price-regular">
        {`$${phone.priceRegular}`}
      </span>
    </div>
    <div className="card__details">
      <div className="card__detail">
        <span className="card__detail-name">Screen</span>
        <span className="card__detail-value">
          {phone.screen}
        </span>
      </div>
      <div className="card__detail">
        <span className="card__detail-name">Capacity</span>
        <span className="card__detail-value">
          {`${phone.capacity
            ? parseInt(phone.capacity, 10)
            : ''
          } ${phone.capacity.slice(-2)}`}
        </span>
      </div>
      <div className="card__detail">
        <span className="card__detail-name">Ram</span>
        <span className="card__detail-value">
          {`${phone.ram
            ? parseInt(phone.ram, 10)
            : ''} ${phone.ram.slice(-2)}`}
        </span>
      </div>
    </div>
    <div className="card__actions">
      <ButtonAddToCart id={phone.phoneId} price={phone.priceDiscount} />
      <ButtonAddToFavourite id={phone.phoneId} />
    </div>
  </div>
);

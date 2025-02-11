import React, { useState } from 'react';
import './PhoneCard.scss';
import favIconFilled from '../../../../public/icons/favourites-filled.svg';
import favIcon from '../../../../public/icons/favourites.svg';

import { Phone } from '../../../types/Phone';
import classNames from 'classnames';

type PhoneCardProps = {
  phone: Phone;
};

export const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  const { images, name, priceRegular, priceDiscount, screen, capacity, ram } =
    phone;

  const [selected, setSelected] = useState(false);
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="phone phone-card">
      <img className="phone__design" src={images[0]} alt={`${name} design`} />

      <p className="phone__name">{`${name}(iMT9G2FS/A)`}</p>

      <div className="price phone__price">
        <p className="price--regular">{`$${priceRegular}`}</p>
        <p className="price--discount">{`$${priceDiscount}`}</p>
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
        <button
          type="button"
          onClick={() => setSelected(!selected)}
          className={classNames('buttons__add-to-cart', { selected: selected })}
        >
          {selected ? 'Added to cart' : 'Add to cart'}
        </button>

        <div onClick={() => setIsFav(!isFav)} className="buttons__add-to-fav">
          <img className="fav-icon" src={isFav ? favIconFilled : favIcon} alt='add / delete favorite'/>
        </div>
      </div>
    </div>
  );
};

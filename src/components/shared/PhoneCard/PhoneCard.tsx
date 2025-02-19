import './PhoneCard.scss';

import React from 'react';
import classNames from 'classnames';

import { useLocalStorage } from '../../../utils/globalStyles/customHooks';


import { ShopItem } from '../../../types/ShopItem';

import favIconFilled from '../../../../public/icons/favourites-filled.svg';
import favIcon from '../../../../public/icons/favourites.svg';

type PhoneCardProps = {
  phone: ShopItem;
};

export const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  const {
    id,
    images,
    name,
    priceRegular,
    priceDiscount,
    screen,
    capacity,
    ram,
  } = phone;

  const { favItems, cartItems, manageItems } = useLocalStorage<ShopItem>();

  const isFav = favItems.some(item => item.id === id);
  const isInCart = cartItems.some(item => item.id === id);

  const handleItemsSelection = (listName: 'fav' | 'cart', isPicked: boolean) => {
    manageItems(phone, listName, isPicked)
  };

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
          onClick={() => handleItemsSelection('cart', isInCart)}
          className={classNames('buttons__add-to-cart', { selected: isInCart })}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <div
          onClick={() => handleItemsSelection('fav', isFav)}
          className="buttons__add-to-fav"
        >
          <img
            className="fav-icon"
            src={isFav ? favIconFilled : favIcon}
            alt="add / delete favorite"
          />
        </div>
      </div>
    </div>
  );
};

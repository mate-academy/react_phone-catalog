import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Phones } from '../../Additional/interfaces';
import { CartGoods, FavGoods } from '../../Additional/additional_api';

type Params = {
  phone: Phones;
};

export const Card: FC<Params> = ({ phone }) => {
  const [favIcon, setFavIcon] = useState('img/icons/fav.svg');
  const [addedToCart, addToCart] = useState(false);

  useEffect(() => {
    if (FavGoods.includes(phone)) {
      setFavIcon('img/icons/fav_active.svg');
    } else {
      setFavIcon('img/icons/fav.svg');
    }

    if (CartGoods.includes(phone)) {
      addToCart(true);
    } else {
      addToCart(false);
    }
  }, [phone]);

  const defineFavStatus = (currentPhone: Phones) => {
    if (FavGoods.find(el => el === currentPhone) === undefined) {
      FavGoods.push(currentPhone);
      setFavIcon('img/icons/fav_active.svg');
    } else {
      FavGoods.splice(FavGoods.findIndex(el => el === currentPhone), 1);
      setFavIcon('img/icons/fav.svg');
    }
  };

  const defineCartStatus = (currentPhone: Phones) => {
    if (CartGoods.find(el => el === currentPhone) === undefined) {
      CartGoods.push(currentPhone);
      addToCart(true);
    } else {
      CartGoods.splice(FavGoods.findIndex(el => el === currentPhone), 1);
      addToCart(false);
    }
  };

  return (
    <div key={phone.id} className="discount__list_item card">
      <Link to={`/${phone.type}s/${phone.id}`} className="card__link">
        <img
          className="card__image"
          src={phone.imageUrl}
          alt={phone.id}
        />
        <p className="card__title">{phone.name}</p>
        <div className="card__price">
          {phone.discount ? (
            <span className="card__price_new">
              $
              {phone.price * (1 - (phone.discount / 100))}
            </span>
          ) : ''}
          <span
            className={cn(phone.discount
              ? 'card__price_new card__price_old'
              : 'card__price_new')}
          >
            $
            {phone.price}
          </span>
        </div>
      </Link>
      <div className="card__specification_wrapper">
        <div className="card__specification">
          <span className="card__specification_title">Screen</span>
          <span className="card__specification_description">
            {phone.screen}
          </span>
        </div>
        <div className="card__specification">
          <span className="card__specification_title">Capacity</span>
          <span className="card__specification_description">
            {phone.capacity}
          </span>
        </div>
        <div className="card__specification">
          <span className="card__specification_title">RAM</span>
          <span className="card__specification_description">
            {phone.ram}
          </span>
        </div>
      </div>
      <div className="discount__list_item-action action">
        <button
          type="button"
          className={addedToCart ? 'action__buy action__buy_active' : 'action__buy'}
          onClick={() => defineCartStatus(phone)}
        >
          {
            addedToCart ? 'Added to cart' : 'Add to cart'
          }
        </button>
        <button
          type="button"
          className="action__add-to-fav-button"
          onClick={() => defineFavStatus(phone)}
        >
          <img
            className="action__add-to-fav"
            alt="favourites"
            src={favIcon}
          />
        </button>
      </div>
    </div>
  );
};

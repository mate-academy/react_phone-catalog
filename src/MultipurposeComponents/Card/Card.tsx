import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Phones } from '../../Additional/interfaces';
import { FavArray } from '../../Additional/additional_api';

type Params = {
  phone: Phones;
};

export const Card: FC<Params> = ({ phone }) => {
  const [favIcon, setFavIcon] = useState('img/icons/fav.svg');

  const defineFavStatus = (id: string) => {
    if (FavArray.find(el => el === id) === undefined) {
      FavArray.push(id);
      setFavIcon('img/icons/fav_active.svg');
    } else {
      FavArray.splice(FavArray.findIndex(el => el === id), 1);
      setFavIcon('img/icons/fav.svg');
    }
  };

  return (
    <div key={phone.id} className="discount__list_item card">
      <Link to={`${phone.type}s/${phone.id}`} className="card__link">
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
          className="action__buy"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="action__add-to-fav-button"
          onClick={() => defineFavStatus(phone.id)}
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

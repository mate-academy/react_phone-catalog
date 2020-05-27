import React, { FC } from 'react';
import cn from 'classnames';
import { Phones } from '../../Additional/interfaces';

type Params = {
  gadgets: Phones[];
};

export const CatalogMaker: FC<Params> = ({ gadgets }) => {
  return (
    <>
      {gadgets.map((phone: Phones) => (
        <div key={phone.id} className="discount__list_item card">
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
            <img
              className="action__add-to-fav"
              alt="favourites"
              src="img/icons/fav.svg"
            />
          </div>
        </div>
      ))}
    </>
  );
};

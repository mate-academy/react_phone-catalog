import React from 'react';
import './Card.scss';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
};

export const Card: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  discount,
  screen,
  capacity,
  ram,
}) => (
  <div className="wrap">
    <article className="card">
      <img alt="card" src={imageUrl} className="card__img" />
      <div className="card__container-inner">
        <h3 className="card__title">{name}</h3>
        <span className="card__prise">
          $
          {(price - price * (discount / 100))}
        </span>
        {' '}
        {discount !== 0
         && (
           <span className="card__oldPrise">
             $
             {price}
           </span>
         )}

        <div className="card__info">
          <div className="card__info-screen card__item">
            <p className="card__info-screen_name">Screen</p>
            <p className="card__info-screen_value">{screen}</p>
          </div>
          <div className="card__info-capacity card__item">
            <p className="card__info-screen_name">Capacity</p>
            <p className="card__info-screen_value">{capacity}</p>
          </div>
          <div className="card__info-ram card__item">
            <p className="card__info-screen_name">RAM</p>
            <p className="card__info-screen_value">{ram}</p>
          </div>
        </div>
        <div className="card__button-wrap">
          <button
            type="button"
            className="card__button-cart"
          >
            Add to cart
          </button>
          <button
            type="button"
            className="card__button-favor"
          >
            favor
          </button>
        </div>
      </div>
    </article>
  </div>
);

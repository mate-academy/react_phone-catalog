import React from 'react';
import './ProductCard.scss';

type Props = {
  imageUrl: string;
  name: string;
  price: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
};

export const ProductCard: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  discount,
  screen,
  capacity,
  ram,
}) => {
  return (
    <div className="products__card card">
      <img className="card__img" src={imageUrl} alt="products img" />
      <div className="card__infoWrap">
        <div className="card__title">{name}</div>
        <h2 className="card__price card__price--discount">
          $
          {(price - price * (discount / 100))}
          {' '}
          {discount !== 0
            && (
              <span className="card__price card__price--full">
                $
                {price}
              </span>
            )}
        </h2>

        <div className="card__details details">
          <div className="details__info">
            <div className="details__info--name">Screen</div>
            <div className="details__info--value">{screen}</div>
          </div>
          <div className="details__info">
            <div className="details__info--name">Capacity</div>
            <div className="details__info--value">{capacity}</div>
          </div>
          <div className="details__info">
            <div className="details__info--name">RAM</div>
            <div className="details__info--value">{ram}</div>
          </div>
        </div>
        <div className="card__buttons button">
          <button
            className="button__cart"
            type="button"
          >
            Add to cart
          </button>
          <button className="button__favorite" type="button">
            <img className="button__favorite--img" src="./img/Icons/heart.svg" alt="heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

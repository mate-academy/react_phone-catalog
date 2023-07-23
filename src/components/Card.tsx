import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Products } from '../type/Products';
import { FavButton } from './FavButton';
import { AddCartButton } from './AddCartButton';

type Props = {
  card: Products;
};

export const Card: React.FC<Props> = ({ card }) => {
  const {
    itemId,
    name,
    price,
    screen,
    capacity,
    ram,
    image,
  } = card;

  const [loadingPicture, setLoadingPicture] = useState(false);

  useEffect(() => {
    setLoadingPicture(true);
  }, [loadingPicture]);

  const correctUrl = `new/${image}`;

  return (
    <div className="card" data-cy="cardsContainer">
      <Link to={`/phones/${itemId}`} className="card__content">
        <div className="card__img-container">
          <img
            src={correctUrl}
            alt={`imagine-${name}`}
            className="card__img"
          />
        </div>

        <h2 className="card__name">{name}</h2>

        <h3 className="card__price">
          $
          {price}
        </h3>
      </Link>

      <div className="card__info">
        <div className="card__info-str">
          <span>Screen</span>
          <span className="card__info-str-value">{screen}</span>
        </div>
        <div className="card__info-str">
          <span>Capacity</span>
          <span className="card__info-str-value">{capacity}</span>
        </div>
        <div className="card__info-str">
          <span>RAM</span>
          <span className="card__info-str-value">{ram}</span>
        </div>
      </div>

      <div className="card__menu">
        <AddCartButton phone={card} />
        <FavButton phone={card} />
      </div>
    </div>
  );
};

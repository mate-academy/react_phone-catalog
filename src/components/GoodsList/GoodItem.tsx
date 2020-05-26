import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FavoritesContext } from '../Favorites';
import { PrimaryButton } from '../Buttons';
import { Icon } from '../Icon';

interface Props {
  good: Good;
}

export const GoodItem: React.FC<Props> = ({ good }) => {
  const { section } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const handleFavorites = (selectedGood: Good) => {
    if (isFavorite(selectedGood)) {
      removeFavorite(selectedGood);
    } else {
      addFavorite(selectedGood);
    }
  };

  return (
    <article key={good.id} className="GoodsList__Item GoodItem">
      <Link to={`/${section}/${good.id}`} className="GoodItem__Link">
        <img
          src={good.imageUrl}
          alt={good.name}
          className="GoodItem__Image"
        />
        <h3 className="GoodItem__Heading">
          {good.name}
        </h3>
      </Link>

      <section className="GoodItem__Price">
        <span className="GoodItem__Price--actual">
          {(good.discount > 0) ? good.price - (good.price / good.discount) : good.price}
        </span>
        {(good.discount > 0) && (
          <span className="GoodItem__Price--full">
            {good.price}
          </span>
        )}
      </section>

      <section className="GoodItem__PropsList">
        <div className="GoodItem__PropsItem">
          <span className="GoodItem__PropsItem--title">Screen</span>
          <span className="GoodItem__PropsItem--value">
            {good.screen ? good.screen : '-'}
          </span>
        </div>

        <div className="GoodItem__PropsItem">
          <span className="GoodItem__PropsItem--title">Capacity</span>
          <span className="GoodItem__PropsItem--value">
            {good.capacity ? good.capacity : '-'}
          </span>
        </div>

        <div className="GoodItem__PropsItem">
          <span className="GoodItem__PropsItem--title">RAM</span>
          <span className="GoodItem__PropsItem--value">
            {good.ram ? good.ram : '-'}
          </span>
        </div>
      </section>

      <section className="GoodItem__Buttons">
        <div className="GoodItem__Buttons--main">
          <PrimaryButton text="Add To Cart" />
        </div>
        <label onClick={() => handleFavorites(good)}>
          <Icon name={isFavorite(good) ? 'favorites-filled' : 'favorites'} border inActive={false} />
        </label>
      </section>
    </article>
  );
};

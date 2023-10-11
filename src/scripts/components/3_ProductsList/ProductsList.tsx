import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { IGood } from '../../helpers/types/IGood';
import { Context } from '../../helpers/context/context';

import './productsList.scss';

type Props = {
  goods: IGood[];
};

export const ProductsList: React.FC<Props> = ({ goods }) => {
  const {
    toggleFav,
    toggleCart,
    favList,
    cartList,
  } = useContext(Context);

  return (
    <div className="ProductsList" data-cy="cardsContainer">
      <ul className="ProductsList__container">
        {goods.map(good => (
          <li
            className="ProductsList__item"
            key={good.id}
          >
            <NavLink
              to={`../${good.type}/${good.id}`}
            >
              <img
                className="ProductsList__img"
                src={`../${good.imageUrl}`}
                alt={good.name}
              />
              <p className="ProductsList__title">
                {good.name}
              </p>
              <div className="ProductsList__price">
                <h2 className="ProductsList__real">
                  {`${good.price - (good.price * good.discount) / 100}`}
                </h2>
                {good.discount > 0 && (
                  <h2 className="ProductsList__withoutDisc">
                    {`$${good.price}`}
                  </h2>
                )}
              </div>

              <div className="ProductsList__info">
                <div className="ProductsList__info-description">
                  <p className="ProductsList__info-title">
                    Screen
                  </p>
                  <p className="ProductsList__info-value">
                    {good.screen}
                  </p>
                </div>

                <div className="ProductsList__info-description">
                  <p className="ProductsList__info-title">
                    Capacity
                  </p>
                  <p className="ProductsList__info-value">
                    {good.capacity}
                  </p>
                </div>

                <div className="ProductsList__info-description">
                  <p className="ProductsList__info-title">
                    RAM
                  </p>
                  <p className="ProductsList__info-value">
                    {good.ram}
                  </p>
                </div>

              </div>
            </NavLink>

            <div className="ProductsList__action">

              {cartList.includes(good) ? (
                <a
                  title="favourites"
                  href="#favourites"
                  className="ProductsList__button-added"
                  onClick={() => toggleCart(good)}
                >
                  Added to cart
                </a>
              ) : (
                <a
                  title="favourites"
                  href="#favourites"
                  className="ProductsList__button"
                  onClick={() => toggleCart(good)}
                >
                  Add to cart
                </a>
              )}

              {favList.includes(good) ? (
                <a
                  className="ProductsList__button-hurt"
                  title="favourites"
                  data-cy="addToFavorite"
                  href="#favourites"
                  onClick={() => toggleFav(good)}
                >
                  <span className="ProductsList__favourites-red" />
                </a>
              ) : (
                <a
                  className="ProductsList__button-hurt"
                  data-cy="addToFavorite"
                  title="favourites"
                  href="#favourites"
                  onClick={() => toggleFav(good)}
                >
                  <span className="ProductsList__favourites" />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

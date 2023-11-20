import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames';
import { Phone } from '../../type/Phone';
import { BASE_URL } from '../../utils/BASE_URL';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartAction from '../../feature/cartSlice';
import * as favoriteAction from '../../feature/favoritesSlice';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToFavorite, setAddedToFavorite] = useState(false);
  const dispatch = useAppDispatch();
  const { cart, favorites } = useAppSelector(store => store);

  const {
    image, price, fullPrice, name, screen, capacity, ram, phoneId,
  } = phone;

  const addCard = (item: Phone) => {
    dispatch(cartAction.addCart(item));
  };

  const deleteCard = (item: Phone) => {
    dispatch(cartAction.removeCart(item));
  };

  const addFavorite = (item: Phone) => {
    dispatch(favoriteAction.addFavorites(item));
  };

  const deleteFavorite = (item: Phone) => {
    dispatch(favoriteAction.removeFavorites(item));
  };

  useEffect(() => {
    if (cart.some(item => item.id === phone.id)) {
      setAddedToCart(true);
    } else {
      setAddedToCart(false);
    }

    if (favorites.some(item => item.id === phone.id)) {
      setAddedToFavorite(true);
    } else {
      setAddedToFavorite(false);
    }
  }, [cart, favorites]);

  return (
    <div
      className="productCard"
      data-cy="cardsContainer"
    >
      <Link to={`/phones/${phoneId}`} className="productCard__photo">
        <img
          src={`${BASE_URL}/_new/${image}`}
          alt={name}
          className="productCard__img"
        />
      </Link>
      <div className="productCard__name">
        <Link to={`/phones/${phoneId}`} className="productCard__linkName">{name}</Link>
      </div>

      {phone.fullPrice < 1200
        ? (
          <div className="productCard__price">
            <span className="productCard__fullPrice">{`$${price}`}</span>
            <span className="productCard__discountedPrice">{`$${fullPrice}`}</span>
          </div>
        )
        : (
          <div className="productCard__price">
            <span className="productCard__fullPrice">{`$${fullPrice}`}</span>
          </div>
        )}

      <div className="productCard__technicInfo">
        <div className="productCard__info productCard__info--left">
          <span>Screen</span>
          <span>Capacity</span>
          <span>RAM</span>
        </div>

        <div className="productCard__info productCard__info--right">
          <span>{screen}</span>
          <span>{capacity}</span>
          <span>{ram}</span>
        </div>
      </div>

      <div className="productCard__action">
        {addedToCart
          ? (
            <button
              type="button"
              className={className(
                'productCard__addToCard',
                'productCard__addToCard--selected',
              )}
              onClick={() => deleteCard(phone)}
            >
              Added to cart
            </button>
          )
          : (
            <button
              type="button"
              className={className(
                'productCard__addToCard',
              )}
              onClick={() => addCard(phone)}
            >
              Add to cart
            </button>
          )}

        {addedToFavorite
          ? (
            <button
              type="button"
              className={className(
                'productCard__addToFavorite',
                'productCard__addToFavorite--selected',
              )}
              onClick={() => deleteFavorite(phone)}
              data-cy="addToFavorite"
            >
              <img
                src="./images/icons/FavouritesSelected.svg"
                alt="Favourites Selected"
                className="icon"
              />
            </button>
          )
          : (
            <button
              type="button"
              className={className(
                'productCard__addToFavorite',
              )}
              onClick={() => addFavorite(phone)}
              data-cy="addToFavorite"
            >
              <img
                src="./images/icons/Favourites.svg"
                alt="Favourites"
                className="icon"
              />
            </button>
          )}
      </div>
    </div>
  );
};

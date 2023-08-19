import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { addToCartStorage } from '../../functions/addToCartStorage';
import { removeFromCartStorage } from '../../functions/removeFromCartStorage';
import { addToFavouritesStorage } from '../../functions/addToFavouritesStorage';
import {
  removeFromFavouritesStorage,
} from '../../functions/removeFromFavouritesStorage';

import { Phone } from '../../types/Phone';

import { CartStorageContext } from '../../contexts/CartStorageContext';
import {
  FavouritesStorageContext,
} from '../../contexts/FavouritesStorageContext';
import {
  HandleFavouritesStorageContext,
} from '../../contexts/HandleFavouritesStorageContext';
import {
  HandleCartStorageContext,
} from '../../contexts/HandleCartStorageContext';

type Props = {
  product: Phone;
};

export const PhoneCard: React.FC<Props> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);

  const cartStorage = useContext(CartStorageContext);
  const favouritesStorage = useContext(FavouritesStorageContext);
  const setFavouritesStorage = useContext(HandleFavouritesStorageContext);
  const setCartStorage = useContext(HandleCartStorageContext);

  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    phoneId,
  } = product;

  useEffect(() => {
    setIsAddedToCart(cartStorage.some((
      { id }: { id: string },
    ) => id === product.id));

    setIsAddedToFavourites(favouritesStorage.some((
      { id }: { id: string },
    ) => id === product.id));
  }, []);

  return (
    <div
      className="product-card"
      data-cy="cardsContainer"
    >
      <Link
        to={`/phones/${phoneId}`}
        className="product-card__container"
      >
        <img
          src={`./${image}`}
          alt={name}
          className="product-card__image"
        />

        <p className="product-card__name">
          {name}
        </p>
      </Link>

      <div className="product-card__container">
        <p className="product-card__price">
          {`$${Math.round(price / 10) * 10 - 1}`}

          {price !== fullPrice && (
            <>
              {' '}

              <span className="product-card__full-price">
                {`$${Math.round(fullPrice / 10) * 10 - 1}`}
              </span>
            </>
          )}
        </p>

        <div className="product-card__line" />

        <div className="product-card__text-box">
          <p className="product-card__param-name">
            Screen
          </p>

          <p className="product-card__param-value">
            {screen}
          </p>
        </div>

        <div className="product-card__text-box">
          <p className="product-card__param-name">
            Capacity
          </p>

          <p className="product-card__param-value">
            {capacity}
          </p>
        </div>

        <div className="product-card__text-box">
          <p className="product-card__param-name">
            RAM
          </p>

          <p className="product-card__param-value">
            {ram}
          </p>
        </div>

        <div className="product-card__interaction-block">
          {isAddedToCart ? (
            <button
              className={classNames(
                'product-card__cart-button',
                'product-card__cart-button--added',
              )}
              type="button"
              onClick={removeFromCartStorage(
                product,
                setCartStorage,
                setIsAddedToCart,
              )}
            >
              Added to cart
            </button>
          ) : (
            <button
              className="product-card__cart-button"
              type="button"
              onClick={addToCartStorage(
                product,
                setIsAddedToCart,
                setCartStorage,
              )}
            >
              Add to cart
            </button>
          )}

          <button
            type="button"
            className="product-card__favourites-button"
            onClick={isAddedToFavourites
              ? removeFromFavouritesStorage(
                product,
                setFavouritesStorage,
                setIsAddedToFavourites,
              )
              : addToFavouritesStorage(
                product,
                setFavouritesStorage,
                setIsAddedToFavourites,
              )}
          >
            <div
              className={classNames(
                'product-card__favourites-icon',
                {
                  'product-card__favourites-icon--added': (
                    isAddedToFavourites
                  ),
                },
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { addToCartStorage } from '../../functions/addToCartStorage';
import { removeFromCartStorage } from '../../functions/removeFromCartStorage';

import { Phone } from '../../types/Phone';

import { CartStorageContext } from '../../contexts/CartStorageContext';

type Props = {
  product: Phone;
};

export const PhoneCard: React.FC<Props> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const cartStorage = useContext(CartStorageContext);

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
              )}
            >
              Add to cart
            </button>
          )}

          <button
            className="product-card__favourites-button"
            type="button"
          >
            <div
              className="product-card__favourites-icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

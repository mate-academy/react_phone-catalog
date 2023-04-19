/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../types/Phone';
import { ProductsContext } from '../context/ProductsContext';
import {
  addOneCart,
  cart,
} from '../utils/cartApi';
import { updateFavourites } from '../utils/favouritesApi';

type Props = {
  phone: Phone;
};

export const ProductCard: React.FC<Props> = ({ phone }) => {
  const {
    cartList,
    setCartList,
    favouritesList,
    setFavouritesList,
  } = useContext(ProductsContext);

  const handleCartButton
  = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setCartList(addOneCart(cartList, cart(phone)));
  };

  const isSelectedCart = useMemo(() => {
    return cartList.some(item => item.id === phone.id);
  }, [cartList]);

  const handleFavouritesButton
  = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setFavouritesList(updateFavourites(favouritesList, phone.id));
  };

  const isSelectedFavourites = useMemo(() => {
    return favouritesList.includes(phone.id);
  }, [favouritesList]);

  const {
    image,
    phoneId,
    name,
    price,
    fullPrice,
    year,
    screen,
    capacity,
    ram,
  } = phone;

  return (
    <Link
      to={`/Phones/${phone.id}`}
      className="product-card"
      data-cy="cardsContainer"
    >
      <div className="product-card__picture">
        <img
          className="product-image"
          src={image}
          alt={phoneId}
        />
      </div>
      <div className="product-info-wrapper">
        <div className="product-card__title">
          <span>{name}</span>
        </div>
        <div className="product-price ">
          <div className="product-price__regular">
            $
            {price}
          </div>
          {year !== 2019 && (
            <div className="product-price__full">
              $
              {fullPrice}
            </div>
          )}
        </div>
        <div className="product-card__details">
          <div className="info-block">
            <div className="info-block__title">Screen</div>
            <div className="info-block__value">{screen}</div>
          </div>
          <div className="info-block">
            <div className="info-block__title">Capacity</div>
            <div className="info-block__value">{capacity}</div>
          </div>
          <div className="info-block">
            <div className="info-block__title">RAM</div>
            <div className="info-block__value">{ram}</div>
          </div>
        </div>
        <div className="card-button">
          <button
            className={classNames(
              'card-button__add',
              { 'card-button__add--selected': isSelectedCart },
            )}
            type="button"
            onClick={handleCartButton}
          >
            { isSelectedCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            data-cy="addToFavorite"
            className={classNames(
              'card-button__favourite',
              { 'card-button__favourite--selected': isSelectedFavourites },
            )}
            type="button"
            onClick={handleFavouritesButton}
          />
        </div>
      </div>
    </Link>
  );
};

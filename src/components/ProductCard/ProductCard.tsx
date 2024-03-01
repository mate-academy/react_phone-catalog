import classNames from 'classnames';
import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

import { CartContext } from '../../contexts/cartContext';
import { FavouritesContext } from '../../contexts/favoritesContext';

import './ProductCard.scss';

import FavouritesFilled from '../../Images/Icons/FavouritesFilled.svg';
import FavouritesHeartLike from '../../Images/Icons/FavouritesHeartLike.svg';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { isInCart, handleCart } = useContext(CartContext);
  const { isInFavorites, handleFavorites } = useContext(FavouritesContext);

  const {
    screen,
    capacity,
    ram,
    price,
    fullPrice,
    name,
    category,
    phoneId,
    image,
  } = product;

  return (
    <div className="product-card" data-cy="cardsContainer">
      <Link
        className="product-card__link"
        to={`/${category}/${phoneId}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <img className="product-card__img" src={`./new/${image}`} alt={name} />
        <p className="product-card__title">{name}</p>
        <div className="product-card__price">
          <h2 className="product-card__price-regular">{`$${price}`}</h2>

          <div className="product-card__price-discount">{`$${fullPrice}`}</div>
        </div>
      </Link>
      <div className="product-card__properties">
        <div className="product-card__property">
          <p className="product-card__property-title">Screen</p>
          <p className="product-card__property-value">{screen}</p>
        </div>

        <div className="product-card__property">
          <p className="product-card__property-title">Capacity</p>
          <p className="product-card__property-value">{capacity}</p>
        </div>

        <div className="product-card__property">
          <p className="product-card__property-title">RAM</p>
          <p className="product-card__property-value">{ram}</p>
        </div>
      </div>

      <div className="product-card__buttons">
        <button
          type="button"
          className={classNames('product-card__button-add-cart', {
            'product-card__button-add-cart--added': isInCart(product),
          })}
          onClick={() => handleCart(product)}
        >
          {isInCart(product) ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={classNames('product-card__button-favorites', {
            'product-card__button-favorites--added': isInFavorites(product),
          })}
          data-cy="addToFavorite"
          onClick={() => handleFavorites(product)}
        >
          {isInFavorites(product) ? (
            <img src={FavouritesFilled} alt="FavouritesFilled" />
          ) : (
            <img src={FavouritesHeartLike} alt="FavouritesHeartLike" />
          )}
        </button>
      </div>
    </div>
  );
};

import classNames from 'classnames';
import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from '../../helpers/CartProvider';
import { FavouritesContext } from '../../helpers/FavouritesProvider';
import { Product } from '../../types/Product';
import { Like } from '../Like/Like';
import { LikeActive } from '../Like/LikeActive';
import { CardItem } from '../../types/CardItem';

import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const [handleChange, setHandleChange] = useState(false);

  const {
    category,
    id,
    phoneId,
    image,
    name,
    price,
    fullPrice,
  } = product;

  const { favourites, setFavourites } = useContext(FavouritesContext);

  const isFavourites = favourites.includes(product.id);

  const handleFavourites = () => {
    let newFavourites = [];

    if (favourites.includes(id)) {
      newFavourites = favourites
        .filter((favourite: string) => favourite !== id);
    } else {
      newFavourites = [...favourites, id];
    }

    setFavourites(newFavourites);
    setHandleChange(!handleChange);
  };

  const handleCart = () => {
    let carts = [];

    if (cart.length) {
      carts = cart;
    }

    if (!carts.find((p: CardItem) => p.id === id)) {
      setCart([
        ...carts,
        {
          id,
          count: 1,
          price,
        },
      ]);
    } else {
      setCart([
        ...carts.filter((p: CardItem) => p.id !== id),
      ]);
    }

    setHandleChange(!handleChange);
  };

  return (
    <div className="product-card">
      <NavLink
        to={`/${category}/${phoneId}`}
        className="product-card__link"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          width="500"
          height="100"
        >
          <path
            d="
              M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3
              208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6
              356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8
              192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7
              0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288
              32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0
              35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9
              1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6
              117.6 67.9s81.6-66.4
              67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4
              11.7c2.1 6.4 3.3 13.2 3.3 20.3z
            "
            fill="#fff"
          />
        </svg>
      </NavLink>

      <img
        src={`../_new/${image}`}
        alt={name}
        className="product-card__image"
      />

      <h2 className="product-card__title">{name}</h2>

      <p className="product-card__price">
        <span className="product-card__current-price">
          {`$${price}`}
        </span>

        {price !== fullPrice && (
          <span className="product-card__old-price">
            {`$${fullPrice}`}
          </span>
        )}
      </p>

      <div className="product-card__info">
        <p className="product-card__info-text">
          Screen
          <span>{product.screen || '-'}</span>
        </p>
        <p className="product-card__info-text">
          Capacity
          <span>{product.capacity || '-'}</span>
        </p>
        <p className="product-card__info-text">
          RAM
          <span>{product.ram || '-'}</span>
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className={classNames(
            'product-card__button product-card__button-cart',
            {
              'product-card__button-cart--active':
                cart.find((p: CardItem) => p.id === product.id),
            },
          )}
          type="button"
          onClick={handleCart}
        >
          Add to cart
        </button>
        <button
          className={classNames(
            'product-card__button product-card__button-favorite',
            { 'product-card__button-favorite--active': isFavourites },
          )}
          type="button"
          data-cy="addToFavorite"
          onClick={handleFavourites}
        >
          <Like />

          <LikeActive />
        </button>
      </div>
    </div>
  );
};

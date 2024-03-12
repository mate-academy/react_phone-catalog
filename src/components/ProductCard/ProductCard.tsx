import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './index.scss';
import { StateStore } from '../../store/StoreContext';
import { ProductExtended } from '../../types/ProductExtended';
import { ICONS } from '../../images';
import { Action } from '../../types/Action';
import { Loader } from '../Loader/Loader';

type Props = {
  product: ProductExtended;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isCartButtonLoading, setIsCartButtonLoading] = useState(false);
  const [isFavoriteButtonLoading, setIsFavoriteButtonLoading] = useState(false);
  const { actionHandler } = useContext(StateStore);
  const {
    image,
    addedToFavorites,
    addedToCart,
    category,
    phoneId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
  } = product;

  const cartButtonText = addedToCart ? 'Added to cart' : 'Add to cart';

  const cartToggleHandler = () => {
    setIsCartButtonLoading(true);
    actionHandler(product, Action.toggleCart);
    setTimeout(() => {
      setIsCartButtonLoading(false);
    }, 500);
  };

  const favoriteToggleHandler = () => {
    setIsFavoriteButtonLoading(true);
    actionHandler(product, Action.toggleFavorite);
    setTimeout(() => {
      setIsFavoriteButtonLoading(false);
    }, 500);
  };

  return (
    <div className="productCard" data-cy="cardsContainer">
      <Link to={`/${category}/${phoneId}`} className="productCard__link">
        <img
          src={`https://mate-academy.github.io/react_phone-catalog/_new/${image}`}
          alt="Product card"
          className="productCard__link__image"
        />
        <p className="productCard__link__title">{name}</p>
      </Link>
      <div className="productCard__price">
        <h2 className="productCard__price--discount">{`$${price}`}</h2>
        <h2 className="productCard__price--full">{`$${fullPrice}`}</h2>
      </div>
      <div className="productCard__divider" />
      <div className="productCard__description">
        <div className="productCard__description--block">
          <p className="productCard__description--name text">Screen</p>
          <p className="productCard__description--value text">{screen}</p>
        </div>
        <div className="productCard__description--block">
          <p className="productCard__description--name text">Capacity</p>
          <p className="productCard__description--value text">{capacity}</p>
        </div>
        <div className="productCard__description--block">
          <p className="productCard__description--name text">RAM</p>
          <p className="productCard__description--value text">{ram}</p>
        </div>
      </div>
      <div className="productCard__buttons">
        <button
          type="button"
          className={cn('productCard__buttons__cart', {
            'productCard__buttons__cart--active': addedToCart,
          })}
          onClick={cartToggleHandler}
          disabled={isCartButtonLoading}
        >
          {isCartButtonLoading ? <Loader /> : cartButtonText}
        </button>
        <button
          type="button"
          data-cy="addToFavorite"
          className={cn('productCard__buttons__favorite', {
            'productCard__buttons__favorite--active': addedToFavorites,
          })}
          onClick={favoriteToggleHandler}
          disabled={isFavoriteButtonLoading}
        >
          {isFavoriteButtonLoading ? (
            <Loader />
          ) : (
            <img
              src={addedToFavorites ? ICONS.favoriteSelected : ICONS.favorite}
              alt="Favourites"
              className="productCard__buttons__icon"
            />
          )}
        </button>
      </div>
    </div>
  );
};

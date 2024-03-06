import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import './index.scss';
import { StateStore } from '../../store/StoreContext';
import { ProductExtended } from '../../types/ProductExtended';
import { ICONS } from '../../images';
import { Action } from '../../types/Action';

type Props = {
  product: ProductExtended;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
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

  const cartToggleHandler = () => {
    actionHandler(product, Action.toggleCart);
  };

  const favoriteToggleHandler = () => {
    actionHandler(product, Action.toggleFavorite);
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
        >
          {addedToCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          data-cy="addToFavorite"
          className={cn('productCard__buttons__favorite', {
            'productCard__buttons__favorite--active': addedToFavorites,
          })}
          onClick={favoriteToggleHandler}
        >
          <img
            src={addedToFavorites ? ICONS.favoriteSelected : ICONS.favorite}
            alt="Favorites"
            className="productCard__buttons__icon"
          />
        </button>
      </div>
    </div>
  );
};

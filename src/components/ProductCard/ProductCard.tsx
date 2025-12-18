import './ProductCard.scss';
import favouritesIcon from '../../images/icons/favourites-heart-like.png';
import favouritesSelected from '../../images/icons/favourites-selected.png';
import { Device } from '../../types/Device';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { DevicesContext } from '../../DevicesContext';

type Props = {
  model: Device;
  brandNewModels?: boolean;
};

export const ProductCard: React.FC<Props> = ({ model, brandNewModels }) => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/').filter(Boolean);
  const basePath = pathParts[0] || 'home';
  const productId = pathParts[1];
  const context = useContext(DevicesContext);

  if (!context) {
    return;
  }

  const { setCart, favourites, setFavourites, cart } = context;

  const handleAddToCart = () => {
    setCart(prev => {
      if (model.id in prev) {
        const { [model.id]: _, ...rest } = prev;

        return rest;
      }

      return {
        ...prev,
        [model.id]: {
          item: model,
          quantity: 1,
        },
      };
    });
  };

  const handleAddToFavourites = () => {
    setFavourites(prev => {
      if (prev.some(item => item.id === model.id)) {
        return prev.filter(item => item.id !== model.id);
      }

      return [...prev, model];
    });
  };

  return (
    <div
      className={classNames('product-card', {
        [`product-card--${basePath}`]: basePath !== 'home' && !productId,
        'product-card--item': productId,
      })}
      key={model.id}
    >
      <div className="product-card__photo">
        <Link to={`/${model.category}/${model.id}`}>
          <img src={model.images[0]} className="product-card__photo__image" />
        </Link>
      </div>

      <div className="product-card__title">{model.name}</div>

      {!brandNewModels ? (
        <div className="product-card__price">
          <div className="product-card__price__price-discount">
            {`$${model.priceDiscount}`}
          </div>

          <div className="product-card__price__price-regular">
            {`$${model.priceRegular}`}
          </div>
        </div>
      ) : (
        <div className="product-card__price">
          <div className="product-card__price__price-discount">
            {`$${model.priceRegular}`}
          </div>
        </div>
      )}

      <div className="product-card__line"></div>

      <div className="product-card__characteristics">
        <div className="product-card__characteristics__container">
          <div className="product-card__characteristics__name">Screen</div>

          <div className="product-card__characteristics__info">
            {model.screen}
          </div>
        </div>

        <div className="product-card__characteristics__container">
          <div className="product-card__characteristics__name">Capacity</div>

          <div className="product-card__characteristics__info">
            {model.capacity.replace('GB', ' GB')}
          </div>
        </div>

        <div className="product-card__characteristics__container">
          <div className="product-card__characteristics__name">RAM</div>

          <div className="product-card__characteristics__info">
            {model.ram.replace('GB', ' GB')}
          </div>
        </div>
      </div>

      <div className="product-card__buttons">
        <button
          className={classNames('product-card__buttons__add-to-cart', {
            'product-card__buttons__add-to-cart--added': Object.keys(cart).some(
              id => id === model.id,
            ),
          })}
          onClick={() => {
            handleAddToCart();
            window.scrollTo({ top: 0 });
          }}
        >
          {Object.keys(cart).some(id => id === model.id)
            ? 'Added'
            : 'Add to cart'}
        </button>

        <button
          className="product-card__buttons__add-to-favourites"
          onClick={handleAddToFavourites}
        >
          {favourites?.some(item => item.id === model.id) ? (
            <img
              src={favouritesSelected}
              alt="heart"
              className="button-add-to-favourites__image"
            />
          ) : (
            <img
              src={favouritesIcon}
              alt="heart"
              className="button-add-to-favourites__image"
            />
          )}
        </button>
      </div>
    </div>
  );
};

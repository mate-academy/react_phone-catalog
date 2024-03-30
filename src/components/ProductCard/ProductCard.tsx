/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';
import { GeneralContext } from '../../helpers/GeneralContext';
import { BASE_URL } from '../../api/api';

import classNames from 'classnames';
import './ProductCard.scss';

type Props = {
  product: Product;
  position?: number;
  showOldPrice: boolean;
};

const ITEM_WIDTH = 288;

export const ProductCard: React.FC<Props> = ({
  product,
  position,
  showOldPrice,
}) => {
  const { favouritesList, setFavouritesList, cartList, setCartList } =
    useContext(GeneralContext);

  const isInFavourites = favouritesList.find(item => item.id === product.id);
  const isInCart = cartList.find(item => item.id === +product.id);

  const toggleFavorite = () => {
    const index = favouritesList.findIndex(item => item.id === product.id);

    if (index === -1) {
      setFavouritesList([...favouritesList, product]);
    } else {
      setFavouritesList([
        ...favouritesList.slice(0, index),
        ...favouritesList.slice(index + 1),
      ]);
    }
  };

  const addToCart = () => {
    const newProduct = {
      id: +product.id,
      quantity: 1,
      product,
    };
    const index = cartList.findIndex(item => item.id === newProduct.id);

    if (index === -1) {
      setCartList([...cartList, newProduct]);
    }
  };

  return (
    <div
      data-cy="cardsContainer"
      className="productCard"
      style={{
        transform: position
          ? `translateX(${-position * ITEM_WIDTH}px)`
          : 'none',
        transition: position ? 'transform 300ms' : 'none',
      }}
    >
      <Link
        to={{
          pathname: `/${product.category}/:${product.itemId}`,
        }}
        className="productCard__top-content"
      >
        <img
          className="productCard__img"
          src={`${BASE_URL}/_new/${product.image}`}
          alt={product.name}
        />

        <h2 className="productCard__title">{product.name}</h2>
      </Link>

      <div className="productCard__bottom-content">
        <div className="productCard__prices">
          {`$${product.price}`}

          {showOldPrice && (
            <div className="productCard__old-price">
              {`$${product.fullPrice}`}

              <span className="productCard__line-through">
                {`$${product.fullPrice}`}
              </span>
            </div>
          )}
        </div>

        <div className="productCard__divider" />

        <div className="productCard__info">
          <div className="productCard__info-row">
            Screen
            <span className="productCard__info-value">{product.screen}</span>
          </div>

          <div className="productCard__info-row">
            Capacity
            <span className="productCard__info-value">{product.capacity}</span>
          </div>

          <div className="productCard__info-row">
            RAM
            <span className="productCard__info-value">{product.ram}</span>
          </div>
        </div>

        <div className="productCard__btns">
          <button
            type="button"
            className={classNames(
              'productCard__addToCart',
              'productCard__btn',
              {
                'productCard__addToCart--added': isInCart,
              },
            )}
            onClick={addToCart}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button
            type="button"
            className={classNames(
              'productCard__favorites',
              'productCard__btn',
              {
                'productCard__favorites--remove': isInFavourites,
                'productCard__favorites--add': !isInFavourites,
              },
            )}
            onClick={toggleFavorite}
            data-cy="addToFavorite"
          >
            {isInFavourites ? (
              <img
                src={
                  require('../../images/icons/favorites-selected.svg').default
                }
                alt="remove from favorite"
              />
            ) : (
              <img
                src={require('../../images/icons/favourities.svg').default}
                alt="add to favorite"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

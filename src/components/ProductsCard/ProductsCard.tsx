/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';

import { Product } from '../../helpers/types/Product';
import './ProductsCard.scss';
import { useAppDispatch, useAppSelector } from '../../helpers/app/hooks';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../helpers/features/favoritesSlice';

import {
  addToCart,
  removeFromCart,
} from '../../helpers/features/cartSlice';
import { getDiscountedPrice } from '../../helpers/utils/getDiscount';

type Props = {
  product: Product,
};

export const ProductsCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;

  const getIsFavorite = () => {
    return favorites.some(favorite => favorite.id === product.id);
  };

  const getIsInCart = () => {
    return cart.some(cartItem => cartItem.id === product.id);
  };

  const handleToggleFavorites = () => {
    const isFavorite = getIsFavorite();

    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleToggleCartItem = () => {
    const isInCart = getIsInCart();

    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <li className="ProductsCard" data-cy="cardsContainer">
      <img
        className="ProductsCard__image"
        src={imageUrl}
        alt={name}
      />
      <p className="ProductsCard__name">
        {name}
      </p>
      <div className="ProductsCard__prices">
        {!!discount && (
          <p className="ProductsCard__price">
            {`$${getDiscountedPrice(product)}`}
          </p>
        )}
        <p
          className={classNames('ProductsCard__price', {
            'ProductsCard__price--discount': !!discount,
          })}
        >
          {`$${price}`}
        </p>
      </div>
      <div className="ProductsCard__info">
        <div className="ProductsCard__field">
          <p className="ProductsCard__field-key">Screen</p>
          <p className="ProductsCard__field-value">
            {screen}
          </p>
        </div>

        <div className="ProductsCard__field">
          <p className="ProductsCard__field-key">Capacity</p>
          <p className="ProductsCard__field-value">
            {capacity || '-'}
          </p>
        </div>

        <div className="ProductsCard__field">
          <p className="ProductsCard__field-key">Ram</p>
          <p className="ProductsCard__field-value">
            {ram || '-'}
          </p>
        </div>

      </div>

      <div className="ProductsCard__add">
        <button
          type="button"
          className={classNames('ProductsCard__add-cart', {
            'ProductsCard__add-cart--selected': getIsInCart(),
          })}
          onClick={handleToggleCartItem}
        >
          {getIsInCart() ? (
            <p>Added to cart</p>
          ) : (
            <p>Add to cart</p>
          )}
        </button>

        <button
          type="button"
          className={classNames('ProductsCard__add-favorites', {
            'ProductsCard__add-favorites--selected': getIsFavorite(),
          })}
          data-cy="addToFavorite"
          onClick={handleToggleFavorites}
        />
      </div>
    </li>
  );
};

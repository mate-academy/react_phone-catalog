import './ActionButtons.scss';
import React, { useCallback, useContext } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../../contexts/AppContext/AppContext';
import { Product } from '../../../types/Product';
import { CartItemType } from '../../../types/CartItemType';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import {
  ThemeContext,
  ThemeType,
} from '../../../contexts/ThemeContext/ThemeContext';
import { getIconSrc } from '../../../helpers/getIconSrc';

type Props = {
  product: Product;
};

export const ActionButtons: React.FC<Props> = ({ product }) => {
  const { theme } = useContext(ThemeContext);
  const { favorites, cart } = useContext(StateContext);

  const isFavorite = favorites.some(favProduct => favProduct.id === product.id);
  const inCart = cart.some(cartItem => cartItem.id === product.id);

  const dispatch = useContext(DispatchContext);

  const location = useLocation();

  const productDetailsPage = location.pathname.includes(product.itemId);

  const addToCart = useCallback(() => {
    if (inCart) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
    } else {
      const newCart: CartItemType = {
        id: product.id,
        quantity: 1,
        product: product,
      };

      dispatch({ type: 'ADD_TO_CART', payload: newCart });
    }
  }, [inCart, dispatch, product]);

  const addToFav = useCallback(() => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAV', payload: product.id });
    } else {
      dispatch({ type: 'ADD_FAV', payload: product });
    }
  }, [isFavorite, dispatch, product]);

  return (
    <div
      className="buttons__wrap"
      style={{ height: productDetailsPage ? '48px' : '40px' }}
    >
      <button
        className={classNames('buttons-text buttons__cart', {
          active: inCart,
          dark: theme === ThemeType.DARK,
        })}
        onClick={addToCart}
      >
        {!inCart ? 'Add to cart' : 'Added'}
      </button>
      <button
        className={classNames('buttons__fav', {
          active: isFavorite,
          dark: theme === ThemeType.DARK,
        })}
        onClick={addToFav}
        style={{ minWidth: productDetailsPage ? '48px' : '40px' }}
      >
        <img
          src={
            !isFavorite ? getIconSrc('heart', theme) : getIconSrc('red-heart')
          }
          alt="favorite"
          className="icon"
        />
      </button>
    </div>
  );
};

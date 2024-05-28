/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import classNames from 'classnames';

import { Product } from '../../../types/Product';
import { GlobalContext } from '../../../GlobalContext';
import { Icon } from '../../Icon';
import { IconList } from '../../Icon/styles/IconList';

import classes from './FavoriteButton.module.scss';

type Props = {
  product: Product;
};

export const FavoriteButton: React.FC<Props> = ({ product }) => {
  const { favourites, dispatch } = useContext(GlobalContext);
  const isFavorite = favourites.some(item => item.id === product.id);

  const checkFavoriteList = () =>
    dispatch({ type: 'SET_FAVOURITE', payload: product });

  return (
    <button
      className={classNames(classes.FavoriteButton, {
        [classes['FavoriteButton--isFavorite']]: isFavorite,
      })}
      type="button"
      onClick={checkFavoriteList}
    >
      <Icon icon={isFavorite ? IconList.favoritesFillde : IconList.favorites} />
    </button>
  );
};

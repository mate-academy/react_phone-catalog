/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import classNames from 'classnames';
import './FavoriteButton.scss';

import { Product } from '../../../types/Product';
import { GlobalContext } from '../../../GlobalContext';
import { Icon } from '../../Icon';
import { IconList } from '../../Icon/styles/IconList';

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
      className={classNames('FavoriteButton', {
        'FavoriteButton--isFavorite': isFavorite,
      })}
      type="button"
      onClick={checkFavoriteList}
    >
      <Icon icon={isFavorite ? IconList.favoritesFillde : IconList.favorites} />
    </button>
  );
};

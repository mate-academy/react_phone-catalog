import React, { useContext } from 'react';
import classNames from 'classnames';

import { GlobalContext } from '../../../GlobalContext';
import { Icon } from '../../Icon';
import { IconList } from '../../Icon/styles/IconList';

import classes from './FavoriteButton.module.scss';

type Props = {
  id: string;
  bigButton?: boolean;
};

export const FavoriteButton: React.FC<Props> = ({ id, bigButton }) => {
  const { favourites, dispatch, products } = useContext(GlobalContext);
  const isFavorite = favourites.some(item => item.itemId === id);
  const product = products.find(item => item.itemId === id);

  const checkFavoriteList = () => {
    if (product) {
      dispatch({ type: 'SET_FAVOURITE', payload: product });
    }
  };

  return (
    <button
      className={classNames(classes.FavoriteButton, {
        [classes['FavoriteButton--isFavorite']]: isFavorite,
        [classes['FavoriteButton--big']]: bigButton,
      })}
      type="button"
      onClick={checkFavoriteList}
    >
      <Icon icon={isFavorite ? IconList.favoritesFillde : IconList.favorites} />
    </button>
  );
};

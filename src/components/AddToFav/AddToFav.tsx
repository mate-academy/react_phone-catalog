import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';

import favIcon from '../../assets/icons/Favourites.svg';
import favIconFiled from '../../assets/icons/Favourites-filled.svg';
import './AddToFav.scss';
import { FavouriteType } from '../../types/FavouriteType';
import { FavAndCartContext } from '../context/FavAndCartContext';

type Props = {
  product: FavouriteType,
};

export const AddToFav: React.FC<Props> = ({ product }) => {
  const { favourites, setFavourites } = useContext(FavAndCartContext);

  const isAdded = useMemo(() => (
    favourites.some(fav => fav.phoneId === product.phoneId)
  ), [favourites, product]);

  const handleBtnClick = useCallback(() => {
    if (isAdded) {
      return setFavourites(favourites.filter(fav => (
        fav.phoneId !== product.phoneId
      )));
    }

    return setFavourites([
      ...favourites,
      product,
    ]);
  }, [favourites]);

  return (
    <button
      type="button"
      className={classNames('add-favourites', {
        'add-favourites--active': isAdded,
      })}
      onClick={handleBtnClick}
      data-cy="addToFavorite"
    >
      <img
        src={isAdded ? favIconFiled : favIcon}
        alt="Favourites"
      />
    </button>
  );
};

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { getFavorites } from '../../redux';
import { useRouter } from '../_hooks/useRouter';
import { LOCATIONS } from '../../common/constants';

export const Favorites = ({ isNavOpen }: FavoritesProps) => {
  const favorites: Product[] = useSelector(getFavorites);
  const { pathname } = useRouter();

  const doFavoritesExist = useMemo(
    () => favorites.length > 0,
    [favorites.length],
  );

  return (
    <div className={cn({
      favorites: true,
      "favorites__mobile": isNavOpen,
    })}>
      <Link
        to="/favorites"
        className={cn({
          favorites__button: true,
          'favorites__button--active': pathname === LOCATIONS.favorites,
        })}
      >
        {doFavoritesExist
        && <span className="favorites__indicator">{favorites.length}</span>}
      </Link>
    </div>
  );
};

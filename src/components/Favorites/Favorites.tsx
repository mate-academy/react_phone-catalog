import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import heart from '../../images/icons/Heart.svg';

import './Favorites.scss';

export const Favorites = () => {
  const location = useLocation();
  const path = location.pathname.split('/').slice(-1);
  let keys = Object.keys(localStorage);

  keys = keys.filter((key) => key.includes('fav') === true);

  return (
    <NavLink
      to="/favourites"
      className={
        classNames(
          'Favorites',
          { 'Favorites--active': path[0] === 'favourites' },
        )
      }
    >
      {keys.length > 0
      && <p className="Favorites__count">{keys.length}</p>}
      <img
        src={heart}
        alt="Favorites items"
        className={
          classNames(
            'Favorites__img',
            { 'Favorites__img--active': path[0] === 'favourites' },
          )
        }
      />
    </NavLink>
  );
};

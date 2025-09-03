import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LocalStorageContext } from '../../context/LocaleStorageContext';
import cn from 'classnames';

import './favoritesAndCarts.scss';

interface Props {
  handle?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const FavoritesAndCarts: React.FC<Props> = ({ handle }) => {
  const { favs, carts } = useContext(LocalStorageContext);

  const location = useLocation();

  const countTotal = (): number => {
    return carts.reduce((acc, val) => {
      return acc + val.amount;
    }, 0);
  };

  const getItemClass = ({ isActive }: { isActive: boolean }) => {
    return cn('favorites-and-carts__link', { 'is-active': isActive });
  };

  return (
    <div
      className="favorites-and-carts"
      onClick={e => (handle ? handle(e) : null)}
    >
      <NavLink
        className={getItemClass}
        to={{ pathname: '/favorite' }}
        state={{ from: location.pathname }}
      >
        <img
          src="img/icons/favourites.svg"
          alt="favourites"
          className="logo--anim"
        />
        {favs.length > 0 && (
          <span className="favorites-and-carts__counter">{favs.length} </span>
        )}
      </NavLink>

      <NavLink
        className={getItemClass}
        to="/carts"
        state={{ from: location.pathname }}
      >
        <img
          src="img/icons/shopping-bag.svg"
          alt="shopping-bag"
          className="logo--anim"
        />
        {carts.length > 0 && (
          <span className="favorites-and-carts__counter">{countTotal()}</span>
        )}
      </NavLink>
    </div>
  );
};

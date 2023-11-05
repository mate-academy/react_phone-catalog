import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Search } from '../Search';

import './nav.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) => cn('nav__link',
  {
    'nav__link--is-active': isActive,
  });

export const Navigation = () => {
  const location = useLocation();
  const phonesPageIsActive = location.pathname === '/phones';
  const tabletsPageIsActive = location.pathname === '/tablets';
  const accessoriesPageIsActive = location.pathname === '/accessories';
  const favoritesPageIsActive = location.pathname === '/favorites';
  const favorites = useAppSelector(state => state.favorites);
  const cartItems = useAppSelector(state => state.cartItems);
  const normalizePathname = location.pathname.slice(1);

  return (
    <nav className="nav header__nav">

      <div className="nav__links">
        <NavLink
          className={getLinkClass}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/phones"
        >
          Phones
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/tablets"
        >
          Tablets
        </NavLink>

        <NavLink
          className={getLinkClass}
          to="/accessories"
        >
          Accessories
        </NavLink>
      </div>

      <div className="nav__favorite">
        {(phonesPageIsActive
        || tabletsPageIsActive
        || accessoriesPageIsActive
        || favoritesPageIsActive
        ) && (
          <Search category={normalizePathname} />
        )}

        <NavLink
          className={({ isActive }) => cn('nav__favorites', {
            'nav__favorites--is-active': isActive,
          })}
          to="/favorites"
        >
          <img
            className="nav__favorites-main-icon"
            src="new/img/icons/favorites.svg"
            alt="favorites"
          />

          {favorites.length > 0
            && (
              <div className="nav__favorites-quantity">
                <img
                  className="nav__favorites-quantity-ellipse"
                  src="new/img/icons/quantity.svg"
                  alt="favorites-quantity"
                />
                <span className="nav__favorites-quantity-content">
                  {favorites.length}
                </span>

              </div>
            )}
        </NavLink>

        <NavLink
          className={({ isActive }) => cn('nav__cart', {
            'nav__cart--is-active': isActive,
          })}
          to="/cart"
        >
          <img
            className="nav__cart-main-icon"
            src="new/img/icons/cart.svg"
            alt="cartItems"
          />

          {cartItems.length > 0
            && (
              <div className="nav__cart-quantity">
                <img
                  className="nav__cart-quantity-ellipse"
                  src="new/img/icons/quantity.svg"
                  alt="cart-quantity"
                />
                <span className="nav__cart-quantity-content">
                  {cartItems.length}
                </span>

              </div>
            )}
        </NavLink>
      </div>
    </nav>
  );
};

import './Header.scss';
import { useContext } from 'react';
import classNames from 'classnames';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { Search } from '../Search';
import { Navigation } from '../Navigation';
import { GlobalContext } from '../../store';

export const Header = () => {
  const { pathname } = useLocation();
  const { favourites, cart } = useContext(GlobalContext);

  const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
    { 'navigation__link-active': isActive },
  );

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <div className="header__logo-image" />
        </Link>
        <Navigation />
      </div>

      <div className="header__right">
        <div className="header__search">
          {pathname === '/phones' && <Search />}
          {pathname === '/tablets' && <Search />}
          {pathname === '/accessories' && <Search />}
          {pathname === '/favourites' && <Search />}
        </div>

        <div className="header__icons">
          <NavLink to="/favourites" className={getLinkClass}>
            <div className="header__icons-icon icon icon-fav">
              {favourites.length !== 0 && (
                <span className="icon-amount">{favourites.length}</span>
              )}
            </div>
          </NavLink>
          <NavLink to="/cart" className={getLinkClass}>
            <div className="icon icon-cart header__icons-icon">
              {cart.length !== 0 && (
                <span className="icon-amount">{cart.length}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

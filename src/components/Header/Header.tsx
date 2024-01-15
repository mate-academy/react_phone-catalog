import './Header.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Navigation } from '../Navigation';
import { useAppSelector } from '../../app/hooks';

const categories = ['phones', 'favourites'];

export const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { favourites, cart } = useAppSelector(state => state.phones);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsVisible(categories.includes(pathname.toString().slice(1)));
  }, [pathname]);

  return (
    <header className="header">
      <div className="header__left">
        <Link
          to="/"
          className="header__logo"
        >
          <div className="header__logo-img" />
        </Link>

        <Navigation />
      </div>

      <div className="header__right">
        {isVisible && (
          <div>
            <input
              type="text"
              className="header__input"
              placeholder="Search in phones..."
            />
          </div>
        )}

        <NavLink
          to="/favourites"
          className={({ isActive }) => cn('header__favourites', {
            'header__favourites-is-active': isActive,
          })}
        >
          <div className="icon icon-favourites header__favourites-img">
            {!!favourites.length && (
              <div className="header__img-status">
                {favourites.length}
              </div>
            )}
          </div>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => cn('header__cart', {
            'header__cart-is-active': isActive,
          })}
        >
          <div className="icon icon-cart header__cart-img">
            {!!cart.length && (
              <div className="header__img-status">
                {cart.length}
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </header>
  );
};

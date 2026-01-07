import cn from 'classnames';
import header from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import React from 'react';

type Props = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ setIsMenuOpen }) => {
  return (
    <header className={header.header} id="top">
      <Link to="/" className={header.header__logo}>
        <img
          src="/img/header/logo.svg"
          alt=""
          className={header.header__logo__img}
        />
      </Link>
      <nav className={cn(header.header__nav, header.nav)}>
        <ul className={header.nav__list}>
          <li className={header.nav__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(header.nav__link, {
                  [header['link--active']]: isActive,
                })
              }
            >
              home
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                cn(header.nav__link, {
                  [header['link--active']]: isActive,
                })
              }
            >
              phones
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                cn(header.nav__link, {
                  [header['link--active']]: isActive,
                })
              }
            >
              tablets
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                cn(header.nav__link, {
                  [header['link--active']]: isActive,
                })
              }
            >
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={cn(header.header__actions, header.actions)}>
        <ul className={header.actions__list}>
          <li className={header.actions__item}>
            <NavLink
              to="favourites"
              className={({ isActive }) =>
                cn(header.actions__link, header.actions__link__fav, {
                  [header['link--active']]: isActive,
                })
              }
            ></NavLink>
          </li>
          <li className={header.actions__item}>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                cn(header.actions__link, header.actions__link__cart, {
                  [header['link--active']]: isActive,
                })
              }
            ></NavLink>
          </li>
          <li className={header.actions__item}>
            <button
              className={cn(header.actions__link, header.actions__link__menu)}
              onClick={() => setIsMenuOpen(prev => !prev)}
            ></button>
          </li>
        </ul>
      </div>
    </header>
  );
};

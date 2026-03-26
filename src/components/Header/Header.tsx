import { Link, NavLink } from 'react-router-dom';
import header from './Header.module.scss';
import cn from 'classnames';
import React, { Dispatch, SetStateAction, useContext } from 'react';
import { FavouritesContext } from '../../contexts/FavouritesContext';
import { CartContext } from '../../contexts/CartContext';

type HeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { fav } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  return (
    <header className={header.header}>
      <Link to="/" className={header.header__logo}>
        <img
          src="public/img/my/logo.svg"
          alt=""
          className={header.header__logo__img}
        />
      </Link>
      <nav className={header.nav}>
        <ul className={header.nav__list}>
          <li className={header.nav__item}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(header.nav__link, { [header.nav__link_active]: isActive })
              }
            >
              Home
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                cn(header.nav__link, { [header.nav__link_active]: isActive })
              }
            >
              Phones
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                cn(header.nav__link, { [header.nav__link_active]: isActive })
              }
            >
              Tablets
            </NavLink>
          </li>
          <li className={header.nav__item}>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                cn(header.nav__link, { [header.nav__link_active]: isActive })
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={header.actions}>
        <ul className={header.actions__list}>
          <li className={header.actions__item}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                cn(header.actions__link, header.actions__link__favorites, {
                  [header.actions__link_active]: isActive,
                })
              }
            >
              {fav.length > 0 && (
                <div className={header.counter__container}>
                  <p className={header.counter__value}>{fav.length}</p>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(header.actions__link, header.actions__link__cart, {
                  [header.actions__link_active]: isActive,
                })
              }
            >
              {cart.length > 0 && (
                <div className={header.counter__container}>
                  <p className={header.counter__value}>
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </p>
                </div>
              )}
            </NavLink>
          </li>
          <li>
            <button
              className={cn(header.actions__link, header.actions__link__menu, {
                [header.actions__link__menu__open]: isMenuOpen,
              })}
              onClick={() => setIsMenuOpen((isOpen: boolean) => !isOpen)}
            ></button>
          </li>
        </ul>
      </div>
    </header>
  );
};

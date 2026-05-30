import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import logo from '../../img/icons/logo.svg';
import close from '../../img/icons/close.svg';
import bag from '../../img/icons/bag.svg';
import menu from '../../img/icons/menu.svg';
import heart from '../../img/icons/heart.svg';
import { Menu } from '../menu/menu';
import { useArrayContext } from '../../ArrayContext';

export const Navigation: React.FC = () => {
  const [focusMenu, setFocusMenu] = useState(false);
  const { favoriteProducts, cartProducts } = useArrayContext();

  return (
    <nav
      className={classNames('navigation', {
        'active-menu': focusMenu,
      })}
    >
      <div className="navigation__top-bar">
        <Link className="navigation__logo-link" to={'/'}>
          <img className="navigation__logo" src={logo} alt="logo" />
        </Link>
        <div className="navigation__links">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              classNames('navigation__link', {
                'is-active': isActive,
              })
            }
          >
            Home
          </NavLink>
          <NavLink
            to={'/phones'}
            className={({ isActive }) =>
              classNames('navigation__link', {
                'is-active': isActive,
              })
            }
          >
            Phones
          </NavLink>
          <NavLink
            to={'/tablets'}
            className={({ isActive }) =>
              classNames('navigation__link', {
                'is-active': isActive,
              })
            }
          >
            Tablets
          </NavLink>
          <NavLink
            to={'/accessories'}
            className={({ isActive }) =>
              classNames('navigation__link', {
                'is-active': isActive,
              })
            }
          >
            Accessories
          </NavLink>
        </div>
        <div className="navigation__icon--links">
          <NavLink
            className={({ isActive }) =>
              classNames('navigation__icon--link', {
                'is-active': isActive,
              })
            }
            to={'/favorites'}
          >
            <img src={heart} alt="heart" />
            {favoriteProducts.length > 0 && (
              <div className="navigation__item-amount">
                {favoriteProducts.length}
              </div>
            )}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              classNames('navigation__icon--link', {
                'is-active': isActive,
              })
            }
            to={'/cart'}
          >
            <img src={bag} alt="bag" />
            {cartProducts.length > 0 && (
              <div className="navigation__item-amount">
                {cartProducts.length}
              </div>
            )}
          </NavLink>
        </div>
        <div className="navigation__buttons">
          {!focusMenu && (
            <button
              className="navigation__button"
              onClick={() => setFocusMenu(true)}
            >
              <img src={menu} alt="menu" />
            </button>
          )}
          {focusMenu && (
            <button
              className="navigation__button"
              onClick={() => setFocusMenu(false)}
            >
              <img src={close} alt="close" />
            </button>
          )}
        </div>
      </div>
      {focusMenu && (
        <div className="navigation__menu">
          <Menu setFocusMenu={setFocusMenu} />
        </div>
      )}
    </nav>
  );
};

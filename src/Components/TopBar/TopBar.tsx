import { Link, NavLink } from 'react-router-dom';
import './top-bar.scss';
import './nav.scss';
import classNames from 'classnames';
import React from 'react';
import menu from '../../images/icons/Menu.svg';
const logo = new URL('../../images/Logo.png', import.meta.url).href;
const fav = new URL(
  '../../images/fav/Icons/Favourites (Heart Like).svg',
  import.meta.url,
).href;
const basket = new URL(
  '../../images/fav/Shopping bag (Cart).svg',
  import.meta.url,
).href;

type Props = {
  cartItemsCount: number;
  favouritesCount: number;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TopBar: React.FC<Props> = ({
  cartItemsCount,
  favouritesCount,
  setMenuOpen,
}) => {
  const navLink = [
    { id: '/', title: 'home' },
    { id: '/phones', title: 'phones' },
    { id: '/tablets', title: 'tablets' },
    { id: '/accessories', title: 'accessories' },
  ];

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('nav__link', {
      'nav__link-selected': isActive,
    });

  const getLink = ({ isActive }: { isActive: boolean }) =>
    classNames('', {
      'header__vectors-selected': isActive,
    });

  return (
    <div className="top-bar favourites__top">
      <div className="nav menu-nav">
        <Link to="#">
          <img className="top-bar__logo" src={logo} alt="Logo" />
        </Link>
        {navLink.map(link => (
          <nav className="nav__list" key={link.id}>
            <li className="nav__item">
              <NavLink to={link.id} className={getLinkClass}>
                {link.title}
              </NavLink>
            </li>
          </nav>
        ))}
      </div>
      <div className="header__vectors">
        <NavLink to="/favourites" className={getLink}>
          <button className="header__fav header__button">
            <img src={fav} className="header__fav-img" alt="Favourites" />
            <div className="header__count">
              <span className="header__count-number header__count-left">
                {favouritesCount}
              </span>
            </div>
          </button>
        </NavLink>
        <NavLink to="/basket" className={getLink}>
          <button className="header__basket header__button">
            <img src={basket} className="header__basket-img" alt="basket" />
            <div className="header__count">
              <span className="header__count-number header__count-right">
                {cartItemsCount}
              </span>
            </div>
          </button>
        </NavLink>
      </div>
      <a className="header__menu">
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="header__button header__button-menu"
        >
          <img src={menu} className="header__menu-img" alt="Menu" />
        </button>
      </a>
    </div>
  );
};

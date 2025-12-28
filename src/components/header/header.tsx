import './Header.scss';

import logo from '../../assets/icons/Logo.svg';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../../context/GlobalContext';
import { Link, NavLink } from 'react-router-dom';

const getActiveLink =
  (type: 'link' | 'fav' | 'cart') =>
  ({ isActive }: { isActive: boolean }) => {
    switch (type) {
      case 'link':
        return classNames(
          'header__link',
          { 'header__link--active': isActive }
        );

      case 'fav':
        return classNames(
          'header__btn',
          'header__btn--fav',
          { 'header__btn--active': isActive }
        );

      case 'cart':
        return classNames(
          'header__btn',
          'header__btn--cart',
          { 'header__btn--active': isActive }
        );
    }
  };

const navLinks = [
  { page: 'home', path: '/' },
  { page: 'phones', path: '/phones' },
  { page: 'tablets', path: '/tablets' },
  { page: 'accessories', path: '/accessories' },
];

export const Header = () => {
  const { favorites, cart } = useContext(GlobalContext);
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
  if (isMenuActive) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, [isMenuActive]);

  return (
    <div className="header">
      <div className="header__body">
        <Link to="/" className="header__logo">
          <img src={logo} alt="logo" />
        </Link>

        <div
          className={classNames('header__wrapper', {
            'is-active': isMenuActive,
          })}
        >
          <nav className="header__menu">
            <ul className="header__list">
              {navLinks.map(link => (
                <li key={link.page}>
                  <NavLink
                    to={link.path}
                    className={getActiveLink('link')}
                    onClick={() => setIsMenuActive(prev => !prev)}
                  >
                    {link.page}
                  </NavLink>
              </li>
              ))}
            </ul>
          </nav>

          <div className="header__buttons">
            <NavLink 
              to={'/favorites'}
              className={getActiveLink('fav')}
              onClick={() => setIsMenuActive(prev => !prev)}
            >
              {!!favorites.length && (
                <span className="header__value">{favorites.length}</span>
              )}
            </NavLink>
            <NavLink 
              to={'/cart'}
              className={getActiveLink('cart')}
              onClick={() => setIsMenuActive(prev => !prev)}
            >
              {!!cart.length && (
                <span className="header__value">{cart.length}</span>
              )}
            </NavLink>
          </div>
        </div>
        <div
          className={classNames('header__burger', {
            'is-active': isMenuActive,
          })}
          onClick={() => setIsMenuActive(prev => !prev)}
        >
          <div className="header__btn header__btn--burger">
            <div className="header__burger-btn">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

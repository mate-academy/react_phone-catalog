import './Header.scss';

import logo from '../../assets/icons/Logo.svg';
import { useContext, useState } from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../../context/GlobalContext';
import { Link, NavLink } from 'react-router-dom';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  classNames('header__link', { 'header__link--active': isActive });

const navLinks = [
  { page: 'home', path: '/' },
  { page: 'phones', path: '/phones' },
  { page: 'tablets', path: '/tablets' },
  { page: 'accessories', path: '/accessories' },
];

export const Header = () => {
  const { favorites, cart } = useContext(GlobalContext);
  const [isMenuActive, setIsMenuActive] = useState(false);

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
                    className={getActiveLink}
                  >
                    {link.page}
                  </NavLink>
              </li>
              ))}
            </ul>
          </nav>

          <div className="header__buttons">
            <div className="header__btn header__btn--fav">
              {!!favorites.length && (
                <span className="header__value">{favorites.length}</span>
              )}
            </div>
            <div className="header__btn header__btn--cart">
              {!!cart.length && (
                <span className="header__value">{cart.length}</span>
              )}
            </div>
          </div>
        </div>
        <div
          className={classNames('header__burger', {
            'is-active': isMenuActive,
          })}
          onClick={() => {
            document.body.classList.toggle('lock');
            setIsMenuActive(prev => !prev);
          }}
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

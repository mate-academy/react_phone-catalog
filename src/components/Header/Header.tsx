import classNames from 'classnames';
import './Header.scss';

import { useState, useEffect, useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Search } from '../Search/Search';
import { useViewport } from '../../helpers/useViewport';
import { Menu } from '../MenuHamburger/Menu';
import { FavouritesContext } from '../../contexts/favoritesContext';
import { CartContext } from '../../contexts/cartContext';
import Hamburger from '../../Images/Icons/Hamburger.svg';

export const Header = () => {
  const isActiveTab = ({ isActive }: { isActive: boolean }) => classNames(
    'nav__link', { nav__active: isActive },
  );
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { isTabletLaptopSize, width } = useViewport();

  const location = useLocation();
  const { pathname } = location;
  const isPathnameHome = pathname === '/';

  const { favorites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    if (!isTabletLaptopSize) {
      setIsMenuOpened(false);
    }
  }, [width]);

  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isMenuOpened]);

  return (
    <header className="header">
      <CSSTransition
        in={isMenuOpened}
        timeout={400}
        classNames="menu-fade"
        unmountOnExit
      >
        <Menu onOpen={setIsMenuOpened} />
      </CSSTransition>

      <div className="header__container">
        {isTabletLaptopSize && (
          <div className="header__container--flex-start">
            <li
              className="header__item"
              onClick={() => setIsMenuOpened(true)}
              aria-hidden="true"
            >
              <div className="header__menu-hamburger">
                <img src={Hamburger} alt="menu" />
              </div>
            </li>

            <Link
              to="/"
              className="header__logo"
            />
          </div>
        )}

        {!isTabletLaptopSize && (
          <div className="header__container--flex-start">
            <Link
              to="/"
              className="header__logo"
            />

            <nav className="nav">
              <ul className="nav__list">
                <li className="nav__item">
                  <NavLink
                    to="/"
                    className={isActiveTab}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav__item">
                  <NavLink
                    to="/phones"
                    className={isActiveTab}
                  >
                    Phones
                  </NavLink>
                </li>

                <li className="nav__item">
                  <NavLink
                    to="/tablets"
                    className={isActiveTab}
                  >
                    Tablets
                  </NavLink>
                </li>

                <li className="nav__item">
                  <NavLink
                    to="/accessories"
                    className={isActiveTab}
                  >
                    Accessories
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        )}

        <div className="header__container--flex-end">
          {!isPathnameHome && (
            <Search />
          )}

          <NavLink
            to="favorites"
            className={({ isActive }: { isActive: boolean }) => classNames(
              'header__favorites',
              'nav__link',
              'nav__link--last',
              { nav__active: isActive },
            )}
          >
            {favorites.length > 0 && (
              <div className="header__icon-count">
                {favorites.length}
              </div>
            )}
          </NavLink>

          <NavLink
            className={({ isActive }: { isActive: boolean }) => classNames(
              'header__shopping-cart',
              'nav__link',
              'nav__link--last',
              { nav__active: isActive },
            )}
            to="cart"
          >
            {cart.length > 0 && (
              <div className="header__icon-count">
                {cart.length}
              </div>
            )}
          </NavLink>
        </div>

      </div>
    </header>
  );
};

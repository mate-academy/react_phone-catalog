import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import { CSSTransition } from 'react-transition-group';

import { useViewport } from '../../helpers/userViewport';
import { CartContext } from '../../storage/cartContext';
import { FavouritesContext } from '../../storage/favoriteContext';

import { Logo } from '../Logo';
import { Menu } from '../Menu';
import { Search } from '../Search';

import './navigation.scss';

function getActiveClass({ isActive }: { isActive: boolean }) {
  return classNames('navigation__page-link', 'navigation__after', {
    'navigation__page-link--active': isActive,
  });
}

export const Navigation: React.FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { isTabletLaptopSize, width } = useViewport();
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavouritesContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isTabletLaptopSize) {
      setIsMenuOpened(false);
    }
  }, [isTabletLaptopSize, width]);

  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }, [isMenuOpened]);

  return (
    <header className="navigation">
      <CSSTransition
        in={isMenuOpened}
        timeout={400}
        classNames="menu-fade"
        unmountOnExit
      >
        <Menu onOpen={setIsMenuOpened} />
      </CSSTransition>

      <nav className="navigation__content" aria-label="header-navigation">
        <ul className="navigation__left-side">
          {isTabletLaptopSize && (
            <li
              className="navigation__item"
              onClick={() => setIsMenuOpened(true)}
              aria-hidden="true"
            >
              <div className="navigation__menu-container">
                <ReactSVG src="img/icons/Hamburger.svg" />
              </div>
            </li>
          ) }

          <li className="navigation__item">
            <Logo />
          </li>

          {!isTabletLaptopSize && (
            <>
              <li className="navigation__item">
                <NavLink to="/" className={getActiveClass}>
                  Home
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/phones" className={getActiveClass}>
                  Phones
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/tablets" className={getActiveClass}>
                  Tablets
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink to="/accessories" className={getActiveClass}>
                  Accessories
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="navigation__right-side">
          <Search key={pathname} />

          <div className="navigation__icon-box">
            <NavLink
              to="/favorites"
              className={({ isActive }) => {
                return classNames(
                  'navigation__icon',
                  'navigation__after',
                  { 'navigation__icon--active': isActive },
                );
              }}
            >
              <div className="navigation__icon-container">
                <ReactSVG src="img/icons/Favourites.svg" />
                {favorites.length > 0 && (
                  <div className="navigation__counter">
                    {favorites.length}
                  </div>
                )}
              </div>
            </NavLink>
          </div>

          <div className="navigation__icon-box">
            <NavLink
              to="/cart"
              className={({ isActive }) => {
                return classNames(
                  'navigation__icon',
                  'navigation__after',
                  { 'navigation__icon--active': isActive },
                );
              }}
            >
              <div className="navigation__icon-container">
                <ReactSVG src="img/icons/Cart.svg" />
                {cart.length > 0 && (
                  <div className="navigation__counter">
                    {cart.length}
                  </div>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

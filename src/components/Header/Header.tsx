import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { BurgerMenu, HeartIcon, ShoppingBagIcon } from '..';
import { Logo } from '../Logo/Logo';
import { useStateContext } from '../../state/state';
import { AppRoute } from '../../enums';
import { getLinkClass } from './helpers/getLinkClass';
import './Header.scss';

export const Header: React.FC = () => {
  const { state } = useStateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const countItemsInCart = state.cart.reduce(
    (sum, item) => item.quantity + sum,
    0,
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  return (
    <div className="header">
      <div className="header__container">
        <Logo className="header__logo" />

        <nav
          className={classNames('header__nav nav nav__container typography', {
            'nav--open': isMenuOpen,
          })}
        >
          <NavLink
            to={AppRoute.HOME}
            className={getLinkClass(
              'nav__link typography__uppercase',
              'nav__link--is-active',
            )}
            onClick={closeMenu}
          >
            home
          </NavLink>
          <NavLink
            to={AppRoute.PHONES}
            className={getLinkClass(
              'nav__link typography__uppercase',
              'nav__link--is-active',
            )}
            onClick={closeMenu}
          >
            phones
          </NavLink>
          <NavLink
            to={AppRoute.TABLETS}
            className={getLinkClass(
              'nav__link typography__uppercase',
              'nav__link--is-active',
            )}
            onClick={closeMenu}
          >
            tablets
          </NavLink>
          <NavLink
            to={AppRoute.ACCESSORIES}
            className={getLinkClass(
              'nav__link typography__uppercase',
              'nav__link--is-active',
            )}
            onClick={closeMenu}
          >
            accessories
          </NavLink>

          {isMenuOpen && (
            <div className="mobile-menu-icons">
              <NavLink
                to={AppRoute.FAVOURITES}
                className={getLinkClass(
                  'mobile-menu-icons__wrapper',
                  'mobile-menu-icons__wrapper--is-active',
                )}
                onClick={closeMenu}
              >
                <HeartIcon count={state.favourites.length} />
              </NavLink>

              <NavLink
                to={AppRoute.CART}
                className={getLinkClass(
                  'mobile-menu-icons__wrapper',
                  'mobile-menu-icons__wrapper--is-active',
                )}
                onClick={closeMenu}
              >
                <ShoppingBagIcon count={state.cart.length} />
              </NavLink>
            </div>
          )}
        </nav>

        <div className="header__icons">
          <div className="header__icons-action hidden-on-mobile">
            <NavLink
              to={AppRoute.FAVOURITES}
              className={getLinkClass(
                'header__icons-wrapper',
                'header__icons-wrapper--is-active',
              )}
            >
              <HeartIcon count={state.favourites.length} />
            </NavLink>
            <NavLink
              to={AppRoute.CART}
              className={getLinkClass(
                'header__icons-wrapper',
                'header__icons-wrapper--is-active',
              )}
            >
              <ShoppingBagIcon count={countItemsInCart} />
            </NavLink>
          </div>
          <div className="header__icons-wrapper hidden-on-desktop">
            <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

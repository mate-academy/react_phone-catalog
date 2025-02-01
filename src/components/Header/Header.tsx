import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import cn from 'classnames';
import { Logo } from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { HeartIcon } from '../Icons/HeartIcon';
import { ShoppingBagIcon } from '../Icons/ShoppingBagIcon';
import { BurgerMenu } from '../Icons/BurgerMenu';
import { AppRoute } from '../../enums/AppRoutes';
import { useStateContext } from '../../state/state';

type GetLinkClass = (
  base: string,
  active: string,
) => ({ isActive }: { isActive: boolean }) => string;

export const getLinkClass: GetLinkClass = (base, active) => {
  return ({ isActive }) => {
    return cn(base, { [active]: isActive });
  };
};

export const Header: React.FC = () => {
  const { state } = useStateContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('overflow-hidden');
    } else {
      document.documentElement.classList.remove('overflow-hidden');
    }

    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  return (
    <header className={style.header}>
      <div className={style.header__container}>
        <Logo className={style.header__logo} />
        <nav
          className={cn(style.header__nav, style.nav, style.nav__container, {
            [style['nav--open']]: isMenuOpen,
          })}
        >
          <NavLink
            to={AppRoute.HOME}
            className={getLinkClass(
              style.nav__link,
              style['nav__link--is-active'],
            )}
            onClick={closeMenu}
          >
            home
          </NavLink>
          <NavLink
            to={AppRoute.PHONES}
            className={getLinkClass(
              style.nav__link,
              style['nav__link--is-active'],
            )}
            onClick={closeMenu}
          >
            phones
          </NavLink>
          <NavLink
            to={AppRoute.TABLETS}
            className={getLinkClass(
              style.nav__link,
              style['nav__link--is-active'],
            )}
            onClick={closeMenu}
          >
            tablets
          </NavLink>
          <NavLink
            to={AppRoute.ACCESSORIES}
            className={getLinkClass(
              style.nav__link,
              style['nav__link--is-active'],
            )}
            onClick={closeMenu}
          >
            accessories
          </NavLink>

          {isMenuOpen && (
            <div className={style.mobile__menu__icons}>
              <NavLink
                to={AppRoute.FAVOURITES}
                className={getLinkClass(
                  style.mobile__menu__icons__wrapper,
                  style['mobile__menu__icons__wrapper--is--active'],
                )}
                onClick={closeMenu}
              >
                <HeartIcon count={state.favourites.length} />
              </NavLink>
              <NavLink
                to={AppRoute.CART}
                className={getLinkClass(
                  style.mobile__menu__icons__wrapper,
                  style['mobile__menu__icons__wrapper--is--active'],
                )}
                onClick={closeMenu}
              >
                <ShoppingBagIcon count={state.cart.length} />
              </NavLink>
            </div>
          )}
        </nav>

        <div className={style.header__icons}>
          <div
            className={`${style['header__icons-action']} ${style['hidden-on-mobile']}`}
          >
            <NavLink
              to={AppRoute.FAVOURITES}
              className={getLinkClass(
                style.header__icons__wrapper,
                style['header__icons__wrapper--is--active'],
              )}
            >
              <HeartIcon count={state.favourites.length} />
            </NavLink>
            <NavLink
              to={AppRoute.CART}
              className={getLinkClass(
                style.header__icons__wrapper,
                style['header__icons__wrapper--is--active'],
              )}
            >
              <ShoppingBagIcon count={state.cart.length} />
            </NavLink>
          </div>
          <div
            className={`${style.header__icons__wrapper} ${style['hidden-on-desktop']}`}
          >
            <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>
    </header>
  );
};

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRoutes } from '../../enums/AppRoutes';
import { useStateContext } from '../../state/state';

import { Logo } from '../Logo/Logo';
import { HeartIcon } from '../Icons/HeartIcon';
import { ShoppingBagIcon } from '../Icons/ShoppingBagIcon';
import { BurgerMenu } from '../Icons/BurgerMenu';

import style from './Header.module.scss';
import cn from 'classnames';

type GetLinkClass = (
  base: string,
  active: string,
) => ({ isActive }: { isActive: boolean }) => string;

export const getLinkClass: GetLinkClass = (base, active) => {
  return ({ isActive }) => {
    return cn(base, { [active]: isActive });
  };
};

export const Header = () => {
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
        <div className={style.header__leftSide}>
          <Logo className={style.header__logo} />

          <nav
            className={cn(style.header__nav, style.nav, style.nav__container, {
              [style['nav--open']]: isMenuOpen,
            })}
          >
            <NavLink
              to={AppRoutes.HOME}
              className={getLinkClass(
                style.nav__link,
                style['nav__link--is-active'],
              )}
              onClick={closeMenu}
            >
              Home
            </NavLink>

            <NavLink
              to={AppRoutes.PHONES}
              className={getLinkClass(
                style.nav__link,
                style['nav__link--is-active'],
              )}
              onClick={closeMenu}
            >
              Phones
            </NavLink>

            <NavLink
              to={AppRoutes.TABLETS}
              className={getLinkClass(
                style.nav__link,
                style['nav__link--is-active'],
              )}
              onClick={closeMenu}
            >
              Tablets
            </NavLink>

            <NavLink
              to={AppRoutes.ACCESSORIES}
              className={getLinkClass(
                style.nav__link,
                style['nav__link--is-active'],
              )}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>

            {isMenuOpen && (
              <div className={style.mobile__menu__icons}>
                <NavLink
                  to={AppRoutes.FAVORITES}
                  className={getLinkClass(
                    style.mobile__menu__icons__wrapper,
                    style['mobile__menu__icons__wrapper--is-active'],
                  )}
                  onClick={closeMenu}
                >
                  <HeartIcon count={state.favourites.length} />
                </NavLink>

                <NavLink
                  to={AppRoutes.CART}
                  className={getLinkClass(
                    style.mobile__menu__icons__wrapper,
                    style['mobile__menu__icons__wrapper--is-active'],
                  )}
                  onClick={closeMenu}
                >
                  <ShoppingBagIcon count={state.cart.length} />
                </NavLink>
              </div>
            )}
          </nav>
        </div>

        <div className={style.header__icons}>
          <div
            className={`${style['header__icons-action']} ${style['hidden-on-mobile']}`}
          >
            <NavLink
              to={AppRoutes.FAVORITES}
              className={getLinkClass(
                style.header__icons__wrapper,
                style['header__icons__wrapper--is-active'],
              )}
              onClick={closeMenu}
            >
              <HeartIcon count={state.favourites.length} />
            </NavLink>

            <NavLink
              to={AppRoutes.CART}
              className={getLinkClass(
                style.header__icons__wrapper,
                style['header__icons__wrapper--is-active'],
              )}
              onClick={closeMenu}
            >
              <ShoppingBagIcon count={state.cart.length} />
            </NavLink>
          </div>

          <div
            className={`${style.header__icons__wrapper__menu} ${style['hidden-on-desktop']}`}
          >
            <BurgerMenu isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </div>
    </header>
  );
};

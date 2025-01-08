import logo from '../../images/logo/logo-header.svg';
import logoDark from '../../images/logo/logo_dark.svg';
import fav from '../../images/icons/favourites.svg';
import favDark from '../../images/icons/fav_dark.svg';
import cart from '../../images/icons/cart.svg';
import cartDark from '../../images/icons/cart_dark.svg';
import burgerMenu from '../../images/icons/burger-menu.svg';
import burgerMenuDark from '../../images/icons/menu_dark.svg';
import close from '../../images/icons/close.svg';
import closeDark from '../../images/icons/close_dark.svg';
import sun from '../../images/icons/sun_white.svg';
import moon from '../../images/icons/moon_png.png';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispath, useAppSelector } from '../../hooks/hooks';
import classNames from 'classnames';
import { SearchField } from '../SearchField';
import { toggleTheme } from '../../features/theme';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Lang } from '../../types/Language';

import './Header.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav--item_link', {
    'header__nav--item_link--active': isActive,
  });

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favourites } = useAppSelector(state => state.favourites);
  const { productsOfCart } = useAppSelector(state => state.cart);

  const { theme } = useAppSelector(state => state.theme);

  const { t } = useTranslation();

  const dispatch = useAppDispath();

  const location = useLocation();
  const isSearchField =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';

  const changeLang = () => {
    const lang = i18next.language === Lang.EN ? Lang.UK : Lang.EN;

    i18next.changeLanguage(lang);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);

    if (isOpen === true) {
      document.body.classList.add('scroll');
    } else {
      document.body.classList.remove('scroll');
    }
  }, [theme, isOpen]);

  return (
    <>
      <div className="header">
        <div className="header__top-bar">
          <div className="header__top-bar_left">
            <div className="header__logo">
              <Link to="/">
                <img
                  src={theme === 'light-theme' ? logo : logoDark}
                  alt="Logo"
                  className="header__logo_img"
                />
              </Link>
            </div>

            <nav className="header__nav">
              <ul className="header__nav--list">
                <li className="header__nav--item">
                  <NavLink to="/" className={getLinkClass}>
                    {t('header.nav.home')}
                  </NavLink>
                </li>
                <li className="header__nav--item">
                  <NavLink to="/phones" className={getLinkClass}>
                    {t('header.nav.phones')}
                  </NavLink>
                </li>
                <li className="header__nav--item">
                  <NavLink to="/tablets" className={getLinkClass}>
                    {t('header.nav.tablets')}
                  </NavLink>
                </li>
                <li className="header__nav--item">
                  <NavLink to="/accessories" className={getLinkClass}>
                    {t('header.nav.accessories')}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header__top-bar_right">
            {isSearchField && <SearchField />}

            <div className="header__icons">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                className="header__theme"
                onClick={() => dispatch(toggleTheme())}
              >
                <div className="header__theme-button">
                  <img
                    src={theme === 'light-theme' ? moon : sun}
                    alt="Theme"
                    className="header__theme-button-img"
                  />
                </div>
              </label>

              <label className="header__lang" onClick={changeLang}>
                <div className="header__lang-button">{t('header.lang')}</div>
              </label>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  classNames('header__icons--favourites', {
                    'header__icons--favourites-isActive': isActive,
                  })
                }
              >
                <img
                  src={theme === 'light-theme' ? fav : favDark}
                  alt="Favourites"
                  className="header__icons--favourites_img"
                />
                {favourites.length > 0 && (
                  <div className="header__icons--favourites_img-count">
                    {favourites.length}
                  </div>
                )}
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  classNames('header__icons--cart', {
                    'header__icons--cart-isActive': isActive,
                  })
                }
              >
                <img
                  src={theme === 'light-theme' ? cart : cartDark}
                  alt="Cart"
                  className="header__icons--cart_img"
                />
                {productsOfCart.length > 0 && (
                  <div className="header__icons--cart_img-count">
                    {/* {productsOfCart.length} */}
                    {productsOfCart.reduce(
                      (acc, item) => acc + item.quantity,
                      0,
                    )}
                  </div>
                )}
              </NavLink>
            </div>
          </div>

          <a
            href="#burger_menu"
            className="burger_menu_icon"
            onClick={() => setIsOpen(true)}
          >
            <img
              src={theme === 'light-theme' ? burgerMenu : burgerMenuDark}
              alt="Burger-menu"
              className="burger_menu_icon_img"
            />
          </a>
        </div>
      </div>

      {isOpen && (
        <aside className="burger_menu" id="burger_menu">
          <div className="burger_menu__top">
            <div className="burger_menu__logo">
              <a href="#/">
                <img
                  src={theme === 'light-theme' ? logo : logoDark}
                  alt="Logo"
                  className="burger_menu__logo_img"
                />
              </a>
            </div>
            <a
              href="#/"
              className="burger_menu__icon"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={theme === 'light-theme' ? close : closeDark}
                alt="Close"
                className="burger_menu__icon_img"
              />
            </a>
          </div>

          <nav className="burger_menu__nav">
            <ul className="burger_menu__nav--list">
              <li className="burger_menu__nav--item">
                <NavLink
                  to="/"
                  className={getLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {t('header.nav.home')}
                </NavLink>
              </li>
              <li className="burger_menu__nav--item">
                <NavLink
                  to="/phones"
                  className={getLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {t('header.nav.phones')}
                </NavLink>
              </li>
              <li className="burger_menu__nav--item">
                <NavLink
                  to="/tablets"
                  className={getLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {t('header.nav.tablets')}
                </NavLink>
              </li>
              <li className="burger_menu__nav--item">
                <NavLink
                  to="/accessories"
                  className={getLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {t('header.nav.accessories')}
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="burger_menu__bottom">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className="burger_menu__bottom-theme burger_menu__bottom_icon"
              onClick={() => dispatch(toggleTheme())}
            >
              <div className="burger_menu__bottom-theme-button">
                <img
                  src={theme === 'light-theme' ? moon : sun}
                  alt="Theme"
                  className="burger_menu__bottom-theme-button-img"
                />
              </div>
            </label>

            <label
              className="burger_menu__bottom-lang burger_menu__bottom_icon"
              onClick={changeLang}
            >
              <div className="burger_menu__bottom-lang-button">
                {t('header.lang')}
              </div>
            </label>
            <Link
              to="/favourites"
              className="burger_menu__bottom_icon burger_menu__bottom-fav"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={theme === 'light-theme' ? fav : favDark}
                alt="Favourites"
                className="burger_menu__bottom_icon--img"
              />
              {favourites.length > 0 && (
                <div className="burger_menu__bottom_icon--img-count">
                  {favourites.length}
                </div>
              )}
            </Link>

            <Link
              to="/cart"
              className="burger_menu__bottom_icon burger_menu__bottom-cart"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={theme === 'light-theme' ? cart : cartDark}
                alt="Cart"
                className="burger_menu__bottom_icon--img"
              />
              {productsOfCart.length > 0 && (
                <div className="burger_menu__bottom_icon--img-count">
                  {productsOfCart.reduce((acc, item) => acc + item.quantity, 0)}
                </div>
              )}
            </Link>
          </div>
        </aside>
      )}
    </>
  );
};

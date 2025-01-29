import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import styles from './header.module.scss';
import logoDarkTheme from '../../images/logo-dark-theme.svg';
import logoLightTheme from '../../images/logo-light-theme.svg';
import { Search } from '../Search';
import sun from '../../images/icon-sun.svg';
import moon from '../../images/icon-moon.svg';
import favoritesLight from '../../images/favorites-light-theme.svg';
import favoritesDark from '../../images/favorites-dark-theme.svg';
import cartIconDark from '../../images/cart-dark-theme.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect, useState } from 'react';
import { toggleTheme } from '../../features/themeSlice';
import cartIconLight from '../../images/cart-light-theme.svg';
import { useTranslation } from 'react-i18next';
import { LanguageType } from '../../types/Language';
import burgerMenuLight from '../../images/burger-menu-light-theme.svg';
import burgerMenuDark from '../../images/burger-menu-dark-theme.svg';
import closeLight from '../../images/icon-close-light-theme.svg';
import closeDark from '../../images/icon-close-dark-theme.svg';

const getActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.header__nav_item_link, {
    [styles.header__nav_item_link_active]: isActive,
  });

export const Header = () => {
  const location = useLocation();
  const { theme } = useAppSelector(state => state.theme);
  const { favoriteProducts } = useAppSelector(state => state.favorites);
  const { cartProducts } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const burgerMenu = theme === 'light' ? burgerMenuLight : burgerMenuDark;
  const changeLanguage = () => {
    const currentLang: LanguageType = i18n.language as LanguageType;
    const newLang: LanguageType =
      currentLang === LanguageType.EN ? LanguageType.UK : LanguageType.EN;

    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuIsOpen]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  const visibleSearch =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories';

  const handleNavLinkClick = (path: string, eve: React.MouseEvent) => {
    eve.preventDefault();
    setMenuIsOpen(false);
    navigate(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.header__left}>
          {/* Logo Section */}
          <div className={styles.header__logo}>
            <Link to="/">
              <img
                src={theme === 'light' ? logoLightTheme : logoDarkTheme}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className={styles.header__nav}>
            <ul className={styles.header__nav_list}>
              <li className={styles.header__nav_item}>
                <NavLink to="/" className={getActiveLinkClass}>
                  {t('header.navigation.home')}
                </NavLink>
              </li>
              <li className={styles.header__nav_item}>
                <NavLink to="/phones" className={getActiveLinkClass}>
                  {t('header.navigation.phones')}
                </NavLink>
              </li>
              <li className={styles.header__nav_item}>
                <NavLink to="/tablets" className={getActiveLinkClass}>
                  {t('header.navigation.tablets')}
                </NavLink>
              </li>
              <li className={styles.header__nav_item}>
                <NavLink to="/accessories" className={getActiveLinkClass}>
                  {t('header.navigation.accessories')}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.header__right}>
          {visibleSearch && <Search />}
          <div className={styles.header__icons}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={styles.header__theme}
              onClick={() => dispatch(toggleTheme())}
            >
              <div className={styles.header__theme_btn}>
                <img
                  src={theme === 'light' ? moon : sun}
                  alt="Theme"
                  className={styles.header__theme_btn_icon}
                />
              </div>
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className={styles.header__lng} onClick={changeLanguage}>
              <div className={styles.header__lng_btn}>
                {t('header.languageSwitcher')}
              </div>
            </label>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                classNames(styles.header__icons_favorites, {
                  [styles.header__icons_favorites_active]: isActive,
                })
              }
            >
              <img
                src={theme === 'light' ? favoritesLight : favoritesDark}
                alt="Favorites"
                className={styles.header__icons_favorites_img}
              />
              {favoriteProducts.length > 0 && (
                <div className={styles.header__icons_favorites_img_count}>
                  {favoriteProducts.length}
                </div>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                classNames(styles.header__icons_cart, {
                  [styles.header__icons_cart_active]: isActive,
                })
              }
            >
              <img
                src={theme === 'light' ? cartIconLight : cartIconDark}
                alt="Favorites"
                className={styles.header__icons_cart_img}
              />
              {cartProducts.length > 0 && (
                <div className={styles.header__icons_cart_img_count}>
                  {cartProducts.reduce(
                    (total, product) => total + product.quantity,
                    0,
                  )}
                </div>
              )}
            </NavLink>
          </div>
        </div>

        {isMobile && (
          <div
            className={styles.header__burgerIcon}
            onClick={() => setMenuIsOpen(true)}
          >
            <img
              src={burgerMenu}
              alt="Burger menu"
              className={styles.header__burgerIcon__image}
            />
          </div>
        )}

        <aside
          className={`${styles.burgerMenu} ${menuIsOpen ? styles.open : ''}`}
          id="burger_menu"
        >
          <div className={styles.burgerMenu__top}>
            <div className={styles.burgerMenu__top__logo}>
              <Link to="/" className={styles.burgerMenu__top__logo__link}>
                <img
                  src={theme === 'light' ? logoLightTheme : logoDarkTheme}
                  alt="Logo"
                  onClick={() => setMenuIsOpen(false)}
                  className={styles.burgerMenu__top__logo__link__img}
                />
              </Link>
            </div>

            <div
              className={styles.burgerMenu__top__icon}
              onClick={() => setMenuIsOpen(false)}
            >
              <img
                src={theme === 'light' ? closeLight : closeDark}
                alt="Close"
                className={styles.burgerMenu__top__icon__img}
              />
            </div>
          </div>

          <nav className={styles.burgerMenu__nav}>
            <ul className={styles.burgerMenu__nav__list}>
              <li className={styles.burgerMenu__nav__list__item}>
                <NavLink
                  to="/"
                  className={getActiveLinkClass}
                  onClick={eve => handleNavLinkClick('/', eve)}
                >
                  {t('header.navigation.home')}
                </NavLink>
              </li>
              <li className={styles.burgerMenu__nav__list__item}>
                <NavLink
                  to="/phones"
                  className={getActiveLinkClass}
                  onClick={eve => handleNavLinkClick('/phones', eve)}
                >
                  {t('header.navigation.phones')}
                </NavLink>
              </li>
              <li className={styles.burgerMenu__nav__list__item}>
                <NavLink
                  to="/tablets"
                  className={getActiveLinkClass}
                  onClick={eve => handleNavLinkClick('/tablets', eve)}
                >
                  {t('header.navigation.tablets')}
                </NavLink>
              </li>
              <li className={styles.burgerMenu__nav__list__item}>
                <NavLink
                  to="/accessories"
                  className={getActiveLinkClass}
                  onClick={eve => handleNavLinkClick('/accessories', eve)}
                >
                  {t('header.navigation.accessories')}
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.burgerMenu__bottom}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={styles.burgerMenu__bottom__theme}
              onClick={() => dispatch(toggleTheme())}
            >
              <button className={styles.burgerMenu__bottom__theme__btn}>
                <img
                  src={theme === 'light' ? moon : sun}
                  alt="Theme"
                  className={styles.burgerMenu__bottom__theme__btn__icon}
                />
              </button>
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className={styles.burgerMenu__bottom__lng}
              onClick={changeLanguage}
            >
              <div className={styles.burgerMenu__bottom__lng__btn}>
                {t('header.languageSwitcher')}
              </div>
            </label>

            <NavLink
              to="/favorites"
              className={styles.burgerMenu__bottom__favorites}
              onClick={eve => handleNavLinkClick('/favorites', eve)}
            >
              <img
                src={theme === 'light' ? favoritesLight : favoritesDark}
                alt="Favorites"
                className={styles.burgerMenu__bottom__favorites__img}
              />
              {favoriteProducts.length > 0 && (
                <div
                  className={styles.burgerMenu__bottom__favorites__img_count}
                >
                  {favoriteProducts.length}
                </div>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={styles.burgerMenu__bottom__cart}
              onClick={eve => handleNavLinkClick('/cart', eve)}
            >
              <img
                src={theme === 'light' ? cartIconLight : cartIconDark}
                alt="Favorites"
                className={styles.burgerMenu__bottom__cart__img}
              />
              {cartProducts.length > 0 && (
                <div className={styles.burgerMenu__bottom__cart__img_count}>
                  {cartProducts.length}
                </div>
              )}
            </NavLink>
          </div>
        </aside>
      </div>
    </header>
  );
};

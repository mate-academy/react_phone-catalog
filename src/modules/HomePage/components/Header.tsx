/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useFavourites } from '../../shared/context/FavouritesContext';
import { useCart } from '../../shared/context/CartContext';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../../shared/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LangSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigation = ['home', 'phones', 'tablets', 'accessories'];
  const { favourites } = useFavourites();
  const { products } = useCart();
  const { theme } = useTheme();

  return (
    <>
      <header className={style.header}>
        <nav className={style.nav}>
          <div className={style.nav__left}>
            <div className={style.nav__logo}>
              <Link to="/">
                <img
                  src={
                    theme === 'light'
                      ? './logo/Logo.png'
                      : './logo/Logo-dark-theme.png'
                  }
                  alt="Logo"
                />
              </Link>
            </div>
            <div className={style.nav__list}>
              <ul className={style.nav__select}>
                {navigation.map(item => (
                  <li className={style.nav__option} key={item}>
                    <Link
                      className={style.nav__link}
                      to={`/${item.toLowerCase()}`}
                    >
                      {t(`navigation.${item}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={style.nav__right}>
            <LanguageSwitcher />
            <ThemeToggle />
            <div className={style.nav__heart}>
              <Link to="/favorites">
                <img
                  src={
                    theme === 'light'
                      ? './icons/heart.png'
                      : './icons/heart-dark-theme.png'
                  }
                  alt="Favorites"
                />
                {favourites.length > 0 && (
                  <span className={style.nav__badge}>{favourites.length}</span>
                )}
              </Link>
            </div>
            <div className={style.nav__cart}>
              <Link to="/cart">
                <img
                  src={
                    theme === 'light'
                      ? './icons/cart.png'
                      : './icons/cart-dark-theme.png'
                  }
                  alt="Cart"
                />
                {products.length > 0 && (
                  <span className={style.nav__badge}>{products.length}</span>
                )}
              </Link>
            </div>
            <div className={style.nav__menu}>
              <Link to="/menu">
                <img
                  src={
                    theme === 'light'
                      ? './icons/menu.png'
                      : './icons/menu-dark-theme.png'
                  }
                  alt="Menu"
                />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

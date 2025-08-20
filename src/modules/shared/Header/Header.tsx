import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import styles from './Header.module.scss';
import { useGlobalState } from '../../../context/store';
import { navLinks } from '../../../constants/navLinks';
import { BurgerMenu } from '../BurgerMenu';
import { useTranslation } from 'react-i18next';
import { getSearch } from '../../../utils/getSearchWith';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.navLink, { [styles.navLinkActive]: isActive });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.iconLink, { [styles.iconLinkActive]: isActive });

export const Header: FC = () => {
  const { toggleMenu, cart, favourites, theme, toggleTheme } = useGlobalState();

  const { t, i18n } = useTranslation();

  const { pathname } = useLocation();

  return (
    <div className={styles.content}>
      <div className={styles.leftPart}>
        <Link to="/" className={styles.logoLink}>
          <img
            src={
              theme === 'dark'
                ? './img/icons/logo.svg'
                : './img/icons/logo-light-theme.svg'
            }
            alt="logo"
            className={styles.logoImg}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map(link => (
              <li key={link.path} className={styles.navItem}>
                <NavLink to={link.path} className={getNavLinkClass}>
                  {t(link.titleKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.buttons}>
          <button onClick={toggleTheme} className={styles.themeSwitcher}>
            {theme === 'dark' ? '🌞' : '🌜'}
          </button>

          <button
            onClick={() => i18n.changeLanguage('en')}
            className={styles.changeLang}
          >
            <div className={styles.iconUK}></div>
            <span>UK</span>
          </button>

          <button
            onClick={() => i18n.changeLanguage('ua')}
            className={styles.changeLang}
          >
            <div className={styles.iconUA}></div>
            <span>UA</span>
          </button>

          <button onClick={toggleMenu} className={styles.buttonMenu}>
            <span
              className={cn(styles.iconMenu, {
                [styles.iconMenuLight]: theme === 'light',
              })}
            ></span>
          </button>
        </div>

        <div className={styles.icons}>
          <NavLink to="/favourites" className={getIconLinkClass}>
            <div className={styles.iconWrapper}>
              <span
                className={cn({
                  [styles.iconFavourite]: theme === 'dark',
                  [styles.iconFavouriteLight]: theme === 'light',
                })}
              ></span>

              {favourites.length > 0 && (
                <span className={styles.itemsAmount}>{favourites.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink to="/cart" className={getIconLinkClass}>
            <div className={styles.iconWrapper}>
              <span
                className={cn({
                  [styles.iconCart]: theme === 'dark',
                  [styles.iconCartLight]: theme === 'light',
                })}
              ></span>

              {cart.length > 0 && (
                <span className={styles.itemsAmount}>{cart.length}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>

      <BurgerMenu />
    </div>
  );
};

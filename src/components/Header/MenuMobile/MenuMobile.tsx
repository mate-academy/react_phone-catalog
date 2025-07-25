import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './MenuMobile.module.scss';
import classNames from 'classnames';
import { navigationItems, navigationPaths } from '../constants/category';
import { createPortal } from 'react-dom';
import { useAppContext } from '../../../hooks/useAppContext';
import { getAssetUrl } from '../../../api/utilis';
import {
  themeIconBasket,
  themeIconClose,
  themeIconFavourite,
  themeIconLogo,
} from '../../../utils/iconsTheme';

type Props = {
  setIsOpen: (value: boolean) => void;
  basket: number;
  favourites: number;
};

export const MenuMobile = ({ setIsOpen, basket, favourites }: Props) => {
  const { state, dispatch } = useAppContext();

  const getNavLinkClassMobile = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.navigationMenu__item, {
      [styles['navigationMenu__item--active']]: isActive,
    });

  const getNavLinkMenu = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.list__link, {
      [styles['list__link--active']]: isActive,
    });

  const handleChangeTheme = () => {
    dispatch({ type: 'TOOGLE_THEME' });
  };

  return createPortal(
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        <div className={styles.menu}>
          <div className={styles.logo}>
            <Link
              onClick={() => setIsOpen(false)}
              to="/"
              aria-label="main page"
            >
              <img
                className={styles.logo__img}
                src={themeIconLogo(state.theme)}
                alt="phone shop logo"
              />
              <img
                className={styles.logo__hand}
                src={getAssetUrl('icons/logo_ok_hand.svg')}
                alt=""
                aria-hidden="true"
              />
            </Link>
          </div>
          <nav className={styles.navigation}>
            <button
              className={styles.navigation__button}
              type="button"
              aria-label="open menu"
              onClick={() => setIsOpen(false)}
            >
              <img
                className={styles.navigation__img}
                src={themeIconClose(state.theme)}
                alt=""
                aria-hidden="true"
              />
            </button>
          </nav>
        </div>
        <ul className={styles.list}>
          {navigationItems.map(item => (
            <li key={item} className={styles.list__item}>
              <NavLink
                onClick={() => setIsOpen(false)}
                to={navigationPaths[item]}
                className={getNavLinkMenu}
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.navigationMenu}>
        <NavLink
          onClick={() => setIsOpen(false)}
          className={getNavLinkClassMobile}
          to="/favourites"
          aria-label="your favourite products"
        >
          <div className={styles.navigationMenu__wrapper}>
            <img
              className={styles.navigationMenu__img}
              src={themeIconFavourite(state.theme)}
              alt=""
              aria-hidden="true"
            />
            {favourites > 0 && (
              <div className={styles.quantity}>
                <p className={styles.quantity__value}>{favourites}</p>
              </div>
            )}
          </div>
        </NavLink>
        <div className={styles.navigationMenu__wrapper}>
          <button
            className={classNames(
              styles.navigationMenu__button,
              styles[`navigationMenu__button--theme`],
            )}
            aria-label="change theme"
            onClick={handleChangeTheme}
          >
            <img
              className={classNames(
                styles.navigationMenu__img,
                styles['navigationMenu__img--theme'],
              )}
              src={getAssetUrl('icons/theme.svg')}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>
        <NavLink
          onClick={() => setIsOpen(false)}
          to="/cart"
          className={getNavLinkClassMobile}
          aria-label="go to basket page"
        >
          <div className={styles.navigationMenu__wrapper}>
            <img
              className={styles.navigationMenu__img}
              src={themeIconBasket(state.theme)}
              alt=""
              aria-hidden="true"
            />
            {basket > 0 && (
              <div className={styles.quantity}>
                <p className={styles.quantity__value}>{basket}</p>
              </div>
            )}
          </div>
        </NavLink>
      </div>
    </div>,
    document.body,
  );
};

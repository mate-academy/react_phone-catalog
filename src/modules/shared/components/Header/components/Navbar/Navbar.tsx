/* eslint-disable max-len */
import React from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../../../../api/hooks';
import favorIcon from '../../../../../../assets/images/header/Favourites (Heart Like).png';
import shopBag from '../../../../../../assets/images/header/Shopping bag (Cart).png';
import menu from '../../../../../../assets/images/header/Menu.svg';
import close from '../../../../../../assets/images/header/Close.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  isMenuClicked: boolean;
  onMenuClosed: () => void;
  onMenuOpen: () => void;
};

const Navbar: React.FC<Props> = ({
  isMenuClicked,
  onMenuClosed,
  onMenuOpen,
}) => {
  const lengthOfFavourites =
    useAppSelector(state => state.favourites.listOfDevices).length || 0;
  const lengthOfCart = useAppSelector(state => state.cart.cartList).length || 0;
  const { t } = useTranslation();

  return (
    <nav
      className={classNames(`${styles.nav}`, {
        [styles.navActive]: isMenuClicked,
      })}
    >
      <div>
        <ul className={styles.nav__list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return classNames(styles.nav__link, {
                  [styles.nav__link__active]: isActive,
                });
              }}
            >
              {t('home')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) => {
                return classNames(styles.nav__link, {
                  [styles.nav__link__active]: isActive,
                });
              }}
            >
              {t('phones')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) => {
                return classNames(styles.nav__link, {
                  [styles.nav__link__active]: isActive,
                });
              }}
            >
              {t('tablets')}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) => {
                return classNames(styles.nav__link, {
                  [styles.nav__link__active]: isActive,
                });
              }}
            >
              {t('accessors')}
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.nav__icon__links}>
        <NavLink
          to="/favourites"
          className={({ isActive }) => {
            return classNames(styles.nav__icon__link, {
              [styles.nav__link__active]: isActive,
            });
          }}
        >
          <img src={favorIcon} alt="icon-favour" className={styles.favourite} />
          {!!lengthOfFavourites && (
            <div className={styles.count}>{lengthOfFavourites}</div>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => {
            return classNames(styles.nav__icon__link, {
              [styles.nav__link__active]: isActive,
            });
          }}
        >
          <img src={shopBag} alt="shopBag" className={styles.shopBag} />
          {!!lengthOfCart && <div className={styles.count}>{lengthOfCart}</div>}
        </NavLink>
        {isMenuClicked ? (
          <div
            className={`${styles.nav__icon__link} ${styles.nav__icon__menu}`}
            onClick={() => onMenuClosed()}
          >
            <img src={close} alt="close" className={styles.close} />
          </div>
        ) : (
          <div
            className={`${styles.nav__icon__link} ${styles.nav__icon__menu}`}
            onClick={() => onMenuOpen()}
          >
            <img src={menu} alt="menu" className={styles.menu} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

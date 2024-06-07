import { Link, NavLink } from 'react-router-dom';

import classNames from 'classnames';
import React from 'react';
import Button from '../../UI/Buttons/Button';
import { ROUTES } from '../../constants/ROUTES';
import { useProductStore } from '../../store/store';
import styles from './BurgerMenu.module.css';

type Props = {
  isMenuShown: boolean;
  setIsMenuShown: (value: boolean) => void;
};

export const MobileMenu: React.FC<Props> = ({
  isMenuShown,
  setIsMenuShown,
}) => {
  const cart = useProductStore(state => state.cartItems);
  const favorites = useProductStore(state => state.favorites);

  const getLinkStatus = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.mobileMenuNavListLink, {
      [styles.activeLink]: isActive,
    });

  const getIconLinkStatus = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.iconLink, {
      [styles.activeLink]: isActive,
    });

  return (
    <div
      className={classNames(styles.mobileMenu, {
        [styles.menuShown]: isMenuShown,
      })}
    >
      <div className={styles.mobileMenuTop}>
        <Link
          to={ROUTES.HOME}
          className={styles.mobileMenuLogoLink}
          onClick={() => setIsMenuShown(false)}
        >
          <img src="img/logo.png" alt="" />
        </Link>

        <button
          className={styles.mobileMenuCloseLink}
          onClick={() => setIsMenuShown(false)}
        >
          <img src="img/icons/close-icon.svg" alt="" />
        </button>
      </div>

      <div className={styles.mobileMenuContainer}>
        <nav className={styles.mobileMenuNav}>
          <ul className={styles.mobileMenuNavList}>
            <li className={styles.mobileMenuNavListItem}>
              <NavLink
                to={ROUTES.HOME}
                className={getLinkStatus}
                onClick={() => setIsMenuShown(false)}
              >
                Home
              </NavLink>
            </li>

            <li className={styles.mobileMenuNavListItem}>
              <NavLink
                to={ROUTES.PHONES}
                className={getLinkStatus}
                onClick={() => setIsMenuShown(false)}
              >
                Phones
              </NavLink>
            </li>

            <li className={styles.mobileMenuNavListItem}>
              <NavLink
                to={ROUTES.TABLETS}
                className={getLinkStatus}
                onClick={() => setIsMenuShown(false)}
              >
                Tablets
              </NavLink>
            </li>

            <li className={styles.mobileMenuNavListItem}>
              <NavLink
                to={ROUTES.ACCESSORIES}
                className={getLinkStatus}
                onClick={() => setIsMenuShown(false)}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.btns}>
          <NavLink
            to={ROUTES.FAVORITES}
            className={getIconLinkStatus}
            onClick={() => setIsMenuShown(false)}
          >
            <Button size={[16, 16]}>
              <img src="img/icons/favorite-icon.svg" alt="" />
              {!!favorites.length && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </Button>
          </NavLink>

          <NavLink to={ROUTES.CART} className={getIconLinkStatus}>
            <Button size={[16, 16]}>
              <img src="img/icons/cart-icon.svg" alt="" />
              {!!cart.length && (
                <span className={styles.badge}>{cart.length}</span>
              )}
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

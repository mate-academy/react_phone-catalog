import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import classNames from 'classnames';
import { FaRegHeart } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Button from '../../../UI/Buttons/Button';
import { ROUTES } from '../../../constants/ROUTES';
import { useCartStore } from '../../../store/cartStore';
import useDarkThemeStore from '../../../store/darkThemeStore';
import { useFavoritesStore } from '../../../store/favoritesStore';
import styles from './BurgerMenu.module.css';

type Props = {
  isMenuShown: boolean;
  setIsMenuShown: (value: boolean) => void;
};

export const MobileMenu: React.FC<Props> = ({
  isMenuShown,
  setIsMenuShown,
}) => {
  const cart = useCartStore(state => state.cartItems);
  const favorites = useFavoritesStore(state => state.favorites);

  const { theme } = useDarkThemeStore();

  const getLinkStatus = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.mobileMenuNavListLink, {
      [styles.activeLink]: isActive,
    });

  const getIconLinkStatus = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.iconLink, {
      [styles.activeLink]: isActive,
    });

  useEffect(() => {
    if (isMenuShown) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }

    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isMenuShown]);

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
          <img
            src={`img/${theme === 'dark' ? 'logo-dark.svg' : 'logo.svg'}`}
            alt="Nice gadgets logo"
          />
        </Link>

        <Button
          variant="ghost"
          className={styles.mobileMenuCloseLink}
          onClick={() => setIsMenuShown(false)}
        >
          <IoClose size={16} />
        </Button>
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
              <FaRegHeart size={16} />{' '}
              {!!favorites.length && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </Button>
          </NavLink>

          <NavLink
            to={ROUTES.CART}
            className={getIconLinkStatus}
            onClick={() => setIsMenuShown(false)}
          >
            <Button size={[16, 16]}>
              <FiShoppingBag size={16} />
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

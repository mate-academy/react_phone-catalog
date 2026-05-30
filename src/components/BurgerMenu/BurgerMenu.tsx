import React from 'react';
import classNames from 'classnames';
import styles from './BurgerMenu.module.scss';
import { IconLink } from '../IconLink';
import { NAV_ITEMS } from '../../constants/constJS';
import { NavItem } from '../NavItem';
import { RoutesLink } from '../../types/routes';
import { useLocation } from 'react-router-dom';
import { CountBadge } from '../CountBadge';

interface BurgerMenuProps {
  onClose: () => void;
  favoritesCount: number;
  cartItemCount: number;
}

const styledActive = (path: string, currentPath: string) =>
  classNames(styles.button, {
    [styles.active]: currentPath === path,
  });

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  onClose,
  favoritesCount,
  cartItemCount,
}) => {
  const location = useLocation();

  return (
    <>
      <div className={styles.top}></div>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          {NAV_ITEMS.map(item => (
            <NavItem key={item.name} {...item} onClick={onClose} />
          ))}
        </ul>
      </nav>

      <div className={styles.bottom}>
        <div
          className={styledActive(RoutesLink.FavoritesPage, location.pathname)}
          onClick={onClose}
        >
          <IconLink
            to={RoutesLink.FavoritesPage}
            iconSrc="img/icons/heart-icon.svg"
            alt="Favorites"
            className={styles.icon}
          />

          <CountBadge count={favoritesCount} className={'burgerMenuCount'} />
        </div>
        <div
          className={styledActive(RoutesLink.CartPage, location.pathname)}
          onClick={onClose}
        >
          <IconLink
            to={RoutesLink.CartPage}
            iconSrc="img/icons/cart.svg"
            alt="Cart"
            className={styles.icon}
          />

          <CountBadge count={cartItemCount} className={'burgerMenuCount'} />
        </div>
      </div>
    </>
  );
};

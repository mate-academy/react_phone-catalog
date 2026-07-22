import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import { navLinks } from '../constants/navLinks';

type Props = {
  isOpen: boolean;
  favoritesCount: number;
  cartItemsCount: number;
  onClose: () => void;
};

export const MobileMenu: FC<Props> = ({
  isOpen,
  favoritesCount,
  cartItemsCount,
  onClose,
}) => {
  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.mobileMenu__link, {
      [styles.mobileMenu__linkActive]: isActive,
    });
  };

  const getActionLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.mobileMenu__actionLink, {
      [styles.mobileMenu__actionLinkActive]: isActive,
    });
  };

  return (
    <nav
      id="mobile-menu"
      className={classNames(styles.mobileMenu, {
        [styles.mobileMenuActive]: isOpen,
      })}
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <ul className={styles.mobileMenu__list}>
        {navLinks.map(link => (
          <li className={styles.mobileMenu__item} key={link.to}>
            <NavLink to={link.to} className={getLinkStyle} onClick={onClose}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.mobileMenu__actions}>
        <NavLink
          to="/favorites"
          className={getActionLinkStyle}
          aria-label="Favorites"
          onClick={onClose}
        >
          <img
            src="img/icons/Favourites.svg"
            className={styles.mobileMenu__actionIcon}
            alt=""
          />

          {favoritesCount > 0 && (
            <span className={styles.mobileMenu__counter}>{favoritesCount}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={getActionLinkStyle}
          aria-label="Cart"
          onClick={onClose}
        >
          <img
            src="img/icons/Cart.svg"
            className={styles.mobileMenu__actionIcon}
            alt=""
          />

          {cartItemsCount > 0 && (
            <span className={styles.mobileMenu__counter}>{cartItemsCount}</span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

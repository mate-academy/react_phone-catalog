import styles from './Header.module.scss';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Logo } from '../Logo';
import { useShop } from '../../context/ShopContext';
import { MobileMenu } from './MobileMenu';
import { navLinks } from './constants/navLinks';

const CLOSE_ICON_PATH =
  'M12.4721 4.47138C12.7324 4.21103 12.7324 3.78892 ' +
  '12.4721 3.52858C12.2117 3.26823 11.7896 3.26823 11.5292 ' +
  '3.52858L8.00065 7.05717L4.47206 3.52858C4.21171 3.26823 ' +
  '3.7896 3.26823 3.52925 3.52858C3.2689 3.78892 3.2689 ' +
  '4.21103 3.52925 4.47138L7.05784 7.99998L3.52925 ' +
  '11.5286C3.2689 11.7889 3.2689 12.211 3.52925 ' +
  '12.4714C3.7896 12.7317 4.21171 12.7317 4.47206 ' +
  '12.4714L8.00065 8.94279L11.5292 12.4714C11.7896 ' +
  '12.7317 12.2117 12.7317 12.4721 12.4714C12.7324 ' +
  '12.211 12.7324 11.7889 12.4721 11.5286L8.94346 ' +
  '7.99998L12.4721 4.47138Z';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.nav__link, {
      [styles.nav__linkActive]: isActive,
    });
  };

  const getActionLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.header__actionLink, {
      [styles.header__actionLinkActive]: isActive,
    });
  };

  const { cartItems, favorites } = useShop();

  const favoritesCount = favorites.length;

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.header__logo}>
            <Logo />
          </div>
          <nav className={styles.nav}>
            {navLinks.map(link => (
              <NavLink to={link.to} className={getLinkStyle} key={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.header__actions}>
          <NavLink to="/favorites" className={getActionLinkStyle}>
            <img
              src="img/icons/Favourites.svg"
              className={styles.header__actionIcon}
              alt="favorites"
            />
            {favoritesCount > 0 && (
              <span className={styles.header__counter}>{favoritesCount}</span>
            )}
          </NavLink>
          <NavLink to="/cart" className={getActionLinkStyle}>
            <img
              src="img/icons/Cart.svg"
              className={styles.header__actionIcon}
              alt="cart"
            />
            {cartItemsCount > 0 && (
              <span className={styles.header__counter}>{cartItemsCount}</span>
            )}
          </NavLink>
        </div>

        <button
          type="button"
          className={styles.header__burgerButton}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(current => !current)}
        >
          {isMenuOpen ? (
            <svg
              className={styles.header__burgerIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={CLOSE_ICON_PATH}
                fill="currentColor"
              />
            </svg>
          ) : (
            <img
              src="img/icons/Menu.svg"
              className={styles.header__burgerIcon}
              alt=""
            />
          )}
        </button>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        favoritesCount={favoritesCount}
        cartItemsCount={cartItemsCount}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

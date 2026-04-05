import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useMenuCloseOnResize } from '../../hooks/useMenuCloseOnResize';
import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { FavouriteIcon } from '../ui/FavouriteIcon';
import { CartIcon } from '../ui/CartIcon';
import { BurgerMenu } from '../BurgerMenu';
import { CloseIcon } from '../ui/CloseIcon';
import { MenuIcon } from '../ui/MenuIcon';
import { ThemeToggler } from '../ui/ThemeToggler';
import { PathType } from '../../types/Types';
import { Search } from '../Search';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const { favourites } = useFavourites();
  const { cartItems } = useCart();

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const favouritesCount = favourites.length;

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    [styles.header__iconLink, isActive ? styles.active : '']
      .filter(Boolean)
      .join(' ');

  useLockBodyScroll(isMenuOpen);
  useMenuCloseOnResize(isMenuOpen, closeMenu);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__top}>
          <Link to={PathType.HOME} className={styles.header__link}>
            <Logo className={styles.header__logo} />
          </Link>

          <Nav className={styles.header__nav} />
          <Search />
          <div className={styles.header__actions}>
            <ThemeToggler />
            <NavLink to={PathType.FAVOURITES} className={getIconLinkClass}>
              <div className={styles.header__iconContainer}>
                <FavouriteIcon className={styles.header__icon} />
                {favouritesCount > 0 && (
                  <span className={styles.header__counter}>
                    {favouritesCount}
                  </span>
                )}
              </div>
            </NavLink>
            <NavLink to={PathType.CART} className={getIconLinkClass}>
              <div className={styles.header__iconContainer}>
                <CartIcon className={styles.header__icon} />
                {cartItemsCount > 0 && (
                  <span className={styles.header__counter}>
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
          <ThemeToggler className={styles.header__themeToggleMobile} />
          <button
            className={styles.header__menu}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      <BurgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};

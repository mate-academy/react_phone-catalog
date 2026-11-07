import { useState } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../../constants/navLinks';
import { BurgerMenu } from '../BurgerMenu';
import Logo from '../../../../assets/logo.svg?react';
import HeartIcon from '../../../../assets/icons/heart.svg?react';
import CartIcon from '../../../../assets/icons/cart.svg?react';
import MenuIcon from '../../../../assets/icons/menu.svg?react';
import CloseIcon from '../../../../assets/icons/close.svg?react';
import styles from './Header.module.scss';
import { IconWithCounter } from '../IconWithCounter';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navLink, { [styles.active]: isActive });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconLink, { [styles.active]: isActive });

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { favorites } = useFavorites();
  const { totalQuantity } = useCart();
  const toggleMenu = () => setIsMenuOpen(current => !current);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.logo}
        aria-label="Nice Gadgets home page"
        onClick={closeMenu}
      >
        <Logo className={styles.logoImage} />
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {NAV_LINKS.map(({ to, title }) => (
            <li key={to} className={styles.navItem}>
              <NavLink to={to} className={getNavLinkClass}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          className={getIconLinkClass}
          aria-label="Favourites"
        >
          <IconWithCounter count={favorites.length}>
            <HeartIcon />
          </IconWithCounter>
        </NavLink>

        <NavLink to="/cart" className={getIconLinkClass} aria-label="Cart">
          <IconWithCounter count={totalQuantity}>
            <CartIcon />
          </IconWithCounter>
        </NavLink>
      </div>

      <button
        type="button"
        className={styles.menuButton}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <BurgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import {
  IconLogo,
  IconHeart,
  IconHeartFilled,
  IconCart,
  IconMenu,
  IconClose,
} from '../Icons';
import styles from './Header.module.scss';

export function Header(): JSX.Element {
  const { totalQuantity } = useCart();
  const { count: favoritesCount } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/phones', label: 'Phones' },
    { to: '/tablets', label: 'Tablets' },
    { to: '/accessories', label: 'Accessories' },
  ];

  return (
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <div className={styles.left}>
          <NavLink
            to="/"
            className={styles.logo}
            aria-label="Nice Gadgets Home"
          >
            <IconLogo />
          </NavLink>
        </div>

        <nav
          className={classNames(styles.nav, { [styles.navOpen]: isMenuOpen })}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className={styles.navList}>
            {navItems.map(item => (
              <li key={item.to} className={styles.navItem}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    classNames(styles.navLink, {
                      [styles.navLinkActive]: isActive,
                    })
                  }
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <button
            className={classNames(styles.iconButton, styles.favoritesButton)}
            onClick={() => {}}
            aria-label={`Favorites, ${favoritesCount} items`}
          >
            {favoritesCount > 0 ? <IconHeartFilled /> : <IconHeart />}
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </button>

          <button
            className={classNames(styles.iconButton, styles.cartButton)}
            onClick={() => {}}
            aria-label={`Cart, ${totalQuantity} items`}
          >
            <IconCart />
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </button>

          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}

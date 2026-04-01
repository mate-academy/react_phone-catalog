import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';

import logoMobile1x from '@/assets/images/nice-gadgets-logo-mobile.png';
import logoMobile2x from '@/assets/images/nice-gadgets-logo-mobile@2x.png';
import logoDesktop1x from '@/assets/images/nice-gadgets-logo-desktop.png';
import logoDesktop2x from '@/assets/images/nice-gadgets-logo-desktop@2x.png';
import iconMenu from '@/assets/icons/icon-menu.svg';
import iconClose from '@/assets/icons/icon-close.svg';
import iconFavorites from '@/assets/icons/icon-favorites.svg';
import iconCart from '@/assets/icons/icon-cart.svg';
import classNames from 'classnames';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones', end: false },
  { to: '/tablets', label: 'Tablets', end: false },
  { to: '/accessories', label: 'Accessories', end: false },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoLink} aria-label="Go to homepage">
        <picture>
          <source
            media="(min-width: 640px)"
            srcSet={`${logoDesktop1x} 1x, ${logoDesktop2x} 2x`}
          />
          <img
            className={styles.logo}
            src={logoMobile1x}
            srcSet={`${logoMobile2x} 2x`}
            alt="Nice Gadgets logo"
          />
        </picture>
      </Link>

      <nav
        aria-label="Main navigation"
        className={classNames(styles.nav, {
          [styles.navMobileOpen]: isMenuOpen,
        })}
      >
        <ul className={styles.navList}>
          {navItems.map(item => (
            <li key={item.to} className={styles.navItem}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  classNames(styles.navLink, {
                    [styles.navLinkActive]: isActive,
                  })
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul className={styles.headerActionsList}>
          <li className={styles.headerActionsItem}>
            <Link to="/favorites" className={styles.headerActionsLink}>
              <span>Favorites</span>
              <img src={iconFavorites} alt="" aria-hidden="true" />
            </Link>
          </li>
          <li className={styles.headerActionsItem}>
            <Link to="/cart" className={styles.headerActionsLink}>
              <span>Cart</span>
              <img src={iconCart} alt="" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        className={styles.menuButton}
        onClick={handleMenuToggle}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <img
          src={isMenuOpen ? iconClose : iconMenu}
          alt=""
          aria-hidden="true"
        />
      </button>
    </header>
  );
};

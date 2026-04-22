import { useState } from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header} data-cy="header">
        <div className={styles.container}>
          {/* Logo */}
          <a href="/" className={styles.logo} aria-label="Go to home">
            <img src="/img/icons/Logo.svg" alt="Nice Gadgets logo" />
          </a>

          {/* Tablet+ nav links */}
          <nav className={styles.nav} aria-label="Main navigation">
            <ul className={styles.navList}>
              <li>
                <a href="/" className={styles.navLink}>
                  Home
                </a>
              </li>
              <li>
                <a href="/phones" className={styles.navLink}>
                  Phones
                </a>
              </li>
              <li>
                <a href="/tablets" className={styles.navLink}>
                  Tablets
                </a>
              </li>
              <li>
                <a href="/accessories" className={styles.navLink}>
                  Accessories
                </a>
              </li>
            </ul>
          </nav>

          {/* Right side buttons */}
          <div className={styles.actions}>
            {/* Tablet+ icon buttons */}
            <a
              href="/favourites"
              className={styles.iconButton}
              aria-label="Favourites"
            >
              <img src="/img/icons/Favourites.svg" alt="Favourites" />
            </a>
            <a href="/cart" className={styles.iconButton} aria-label="Cart">
              <img src="/img/icons/Cart.svg" alt="Cart" />
            </a>

            {/* Mobile-only menu button */}
            <button
              className={styles.menuButton}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <img
                src={menuOpen ? '/img/icons/Close.svg' : '/img/icons/Menu.svg'}
                alt={menuOpen ? 'Close' : 'Menu'}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <nav
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className={styles.mobileNavList}>
          <li>
            <a href="/" className={styles.mobileNavLink}>
              Home
            </a>
          </li>
          <li>
            <a href="/phones" className={styles.mobileNavLink}>
              Phones
            </a>
          </li>
          <li>
            <a href="/tablets" className={styles.mobileNavLink}>
              Tablets
            </a>
          </li>
          <li>
            <a href="/accessories" className={styles.mobileNavLink}>
              Accessories
            </a>
          </li>
        </ul>

        <div className={styles.menuBottomActions}>
          <a
            href="/favourites"
            className={styles.menuIconButton}
            aria-label="Favourites"
          >
            <img src="/img/icons/Favourites.svg" alt="Favourites" />
          </a>
          <a href="/cart" className={styles.menuIconButton} aria-label="Cart">
            <img src="/img/icons/Cart.svg" alt="Cart" />
          </a>
        </div>
      </nav>
    </>
  );
};

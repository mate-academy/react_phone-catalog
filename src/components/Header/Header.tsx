import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { useCart } from '../../context/CartContext';
import { IconWithBadge } from '../IconWithBadge/IconWithBadge';
import { useFavorites } from '../../context/FavoritesContext';
import { useLocation } from 'react-router-dom';
import { SearchInput } from '../SearchInput';
import styles from './Header.module.scss';

const SEARCH_PLACEHOLDERS: Record<string, string> = {
  '/phones': 'Search in phones...',
  '/tablets': 'Search in tablets...',
  '/accessories': 'Search in accessories...',
  '/favorites': 'Search in favourites...',
};

const NavItem = ({
  to,
  end,
  children,
}: {
  to: string;
  end?: boolean;
  children: string;
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
    }
  >
    <span className={styles.navLinkText}>{children}</span>
  </NavLink>
);

const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`;

export const Header = () => {
  const [isMenuOpen, setMenuIsOpen] = useState(false);

  const closeMenu = () => setMenuIsOpen(false);

  const { totalCount } = useCart();

  const { totalCount: favoritesCount } = useFavorites();

  const location = useLocation();

  const searchPlaceholder = SEARCH_PLACEHOLDERS[location.pathname];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.content}>
          <div className={styles.left}>
            <NavLink to="/" className={styles.logo}>
              <Icon name="logo" />
            </NavLink>

            <nav className={styles.nav}>
              <NavItem to="/" end>
                Home
              </NavItem>
              <NavItem to="/phones">Phones</NavItem>
              <NavItem to="/tablets">Tablets</NavItem>
              <NavItem to="/accessories">Accessories</NavItem>
            </nav>
          </div>

          {searchPlaceholder && (
            <div className={styles.searchWrapper}>
              <SearchInput placeholder={searchPlaceholder} />
            </div>
          )}

          <div className={styles.actions}>
            <div className={styles.iconActions}>
              <NavLink to="/favorites" className={styles.iconLink}>
                <IconWithBadge name="heart" count={favoritesCount} />
              </NavLink>
              <NavLink to="/cart" className={styles.iconLink}>
                <IconWithBadge name="cart" count={totalCount} />
              </NavLink>
            </div>
            <button
              type="button"
              className={styles.burgerButton}
              onClick={() => setMenuIsOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <NavLink to="/" className={styles.logo}>
              <Icon name="logo" />
            </NavLink>
            <button
              type="button"
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <Icon name="close" />
            </button>
          </div>

          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              end
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>
          <div className={styles.mobileMenuFooter}>
            <NavLink
              to="/favorites"
              className={styles.mobileIconLink}
              onClick={closeMenu}
            >
              <IconWithBadge name="heart" count={favoritesCount} />
            </NavLink>
            <NavLink
              to="/cart"
              className={styles.mobileIconLink}
              onClick={closeMenu}
            >
              <IconWithBadge name="cart" count={totalCount} />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { useActiveCategory } from '../../context/ActiveCategoryContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const TABLET_WIDTH = 640;

const getLinkClass = (isActive: boolean) =>
  cn(styles.link, { [styles.active]: isActive });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(styles.iconLink, { [styles.active]: isActive });

const Badge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span className={styles.badge} aria-hidden="true">
      {count}
    </span>
  ) : null;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const { activeCategory } = useActiveCategory();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    const handleResize = () => {
      if (window.innerWidth >= TABLET_WIDTH) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const favoritesLabel = `Favorites, ${favorites.length} items`;
  const cartLabel = `Cart, ${totalQuantity} items`;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo className={styles.logo} />

        <nav className={styles.nav} aria-label="Main">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                getLinkClass(isActive || to === `/${activeCategory}`)
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className={styles.actions}>
        <ThemeToggle className={styles.themeToggle} />

        <NavLink
          to="/favorites"
          className={getIconLinkClass}
          aria-label={favoritesLabel}
        >
          <span className={styles.iconWrap}>
            <Icon name="heart" size={16} />
            <Badge count={favorites.length} />
          </span>
        </NavLink>

        <NavLink to="/cart" className={getIconLinkClass} aria-label={cartLabel}>
          <span className={styles.iconWrap}>
            <Icon name="bag" size={16} />
            <Badge count={totalQuantity} />
          </span>
        </NavLink>

        <button
          type="button"
          className={styles.burger}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(current => !current)}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} size={16} />
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={cn(styles.menu, { [styles.menuOpen]: isMenuOpen })}
      >
        <div className={styles.menuLinks}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                getLinkClass(isActive || to === `/${activeCategory}`)
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className={styles.menuActions}>
          <ThemeToggle className={styles.themeToggle} />

          <NavLink
            to="/favorites"
            className={getIconLinkClass}
            aria-label={favoritesLabel}
          >
            <span className={styles.iconWrap}>
              <Icon name="heart" size={16} />
              <Badge count={favorites.length} />
            </span>
          </NavLink>

          <NavLink
            to="/cart"
            className={getIconLinkClass}
            aria-label={cartLabel}
          >
            <span className={styles.iconWrap}>
              <Icon name="bag" size={16} />
              <Badge count={totalQuantity} />
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

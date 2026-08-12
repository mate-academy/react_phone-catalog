import { NavLink } from 'react-router-dom';

import { Icon } from '../Icon';
import { LanguageToggle } from '../LanguageToggle';
import { Logo } from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
import { NAV_ITEMS } from '../../constants/navItems';
import { ROUTES } from '../../constants/routes';
import { useTranslation } from '../../hooks';
import styles from './MobileMenu.module.scss';

type Props = {
  id: string;
  isOpen: boolean;
  favoriteCount: number;
  cartCount: number;
  onClose: () => void;
};

export const MobileMenu = ({
  id,
  isOpen,
  favoriteCount,
  cartCount,
  onClose,
}: Props) => {
  const t = useTranslation();

  const menuClassName = [styles.menu, isOpen && styles.menuOpen]
    .filter(Boolean)
    .join(' ');

  return (
    <aside
      id={id}
      className={menuClassName}
      aria-hidden={!isOpen}
      aria-label={t.header.mobileMenu}
    >
      <div className={styles.top}>
        <div className={styles.logoWrapper} onClick={onClose}>
          <Logo />
        </div>

        <button
          className={styles.closeButton}
          type="button"
          aria-label={t.header.closeMenu}
          onClick={onClose}
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      <nav className={styles.nav} aria-label={t.header.mainNavigation}>
        {NAV_ITEMS.map(({ labelKey, path }) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
            key={path}
            to={path}
          >
            {t.header[labelKey]}
          </NavLink>
        ))}
      </nav>

      <div className={styles.actions}>
        <div className={styles.actionItem}>
          <ThemeToggle />
        </div>

        <div className={styles.actionItem}>
          <LanguageToggle />
        </div>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.actionItem} ${styles.actionItemActive}`
              : styles.actionItem
          }
          to={ROUTES.favorites}
          aria-label={`${t.header.favorites}: ${favoriteCount}`}
          onClick={onClose}
        >
          <Icon name="heart" size={16} />

          {favoriteCount > 0 && (
            <span className={styles.badge} aria-hidden="true">
              {favoriteCount}
            </span>
          )}
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${styles.actionItem} ${styles.actionItemActive}`
              : styles.actionItem
          }
          to={ROUTES.cart}
          aria-label={`${t.header.cart}: ${cartCount}`}
          onClick={onClose}
        >
          <Icon name="cart" size={16} />

          {cartCount > 0 && (
            <span className={styles.badge} aria-hidden="true">
              {cartCount}
            </span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

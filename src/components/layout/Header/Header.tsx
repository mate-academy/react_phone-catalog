import styles from '@/components/layout/Header/Header.module.scss';
import { NavLink } from 'react-router-dom';
import { LangSwitcher } from '@/components/ui/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo/Logo';
import { ThemeToggler } from '@/components/ui/ThemeToggle';
import { Heart, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/store/cartStore';

const NAV_ITEMS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.phones', href: '/phones' },
  { key: 'nav.tablets', href: '/tablets' },
  { key: 'nav.accessories', href: '/accessories' },
];

export const Header = () => {
  const { t } = useTranslation('common');
  const cartCount = useCartStore(state => state.cartItems.length);
  // const favCount = useFavoritesStore((state) => state.favorites.length);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav>
        <ul className={styles.navList}>
          {NAV_ITEMS.map(item => {
            return (
              <li key={item.key} className={styles.navItem}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  {t(item.key)}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.actions}>
        <LangSwitcher />
        <ThemeToggler />
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.actionBtn} ${isActive ? styles.active : ''}`
          }
          aria-label="Favorites"
        >
          <Heart size={16} strokeWidth={1.5} />
          {/* {favCount > 0 && <span className={styles.badge}>{favCount}</span>} */}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.actionBtn} ${isActive ? styles.active : ''}`
          }
          aria-label="Cart"
        >
          <ShoppingBag size={16} strokeWidth={1.5} />
          {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
        </NavLink>
      </div>
    </header>
  );
};

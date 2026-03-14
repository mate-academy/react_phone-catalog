import styles from '@/components/layout/Header/Header.module.scss';
import { NavLink } from 'react-router-dom';
import { LangSwitcher } from '@/components/ui/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo/Logo';
import { ThemeToggler } from '@/components/ui/ThemeToggle';
import { Heart, Menu, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { useEffect, useState } from 'react';
// import { useCartStore } from '@/store/cartStore';

export const NAV_ITEMS = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.phones', href: '/phones' },
  { key: 'nav.tablets', href: '/tablets' },
  { key: 'nav.accessories', href: '/accessories' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation('common');
  // const cartCount = useCartStore(state => state.cartItems.length);
  // const favCount = useFavoritesStore((state) => state.favorites.length);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

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
          {/* {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>} */}
        </NavLink>
        <button
          className={styles.burgerBtn}
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={NAV_ITEMS}
      />
    </header>
  );
};

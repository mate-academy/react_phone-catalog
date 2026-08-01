import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useCart, useFavourites, useTranslation } from '@shared/context';
import { TranslationKey } from '@shared/i18n';
import { Logo } from '@shared/components/Logo';
import { Search } from '@shared/components/Search';
import { ThemeToggle } from '@shared/components/ThemeToggle';
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher';
import {
  closeIcon,
  favouritesIcon,
  menuIcon,
  shoppingBagIcon,
} from '@shared/assets/icons';
import styles from './Header.module.scss';

const NAV_LINKS: { titleKey: TranslationKey; path: string }[] = [
  { titleKey: 'nav.home', path: '/' },
  { titleKey: 'nav.phones', path: '/phones' },
  { titleKey: 'nav.tablets', path: '/tablets' },
  { titleKey: 'nav.accessories', path: '/accessories' },
];

// Only the pages that render a ProductsList can be searched in.
const SEARCH_PLACEHOLDERS: Record<string, TranslationKey> = {
  '/phones': 'search.placeholder.phones',
  '/tablets': 'search.placeholder.tablets',
  '/accessories': 'search.placeholder.accessories',
  '/favourites': 'search.placeholder.favourites',
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { favouriteIds } = useFavourites();
  const { totalQuantity } = useCart();
  const { t } = useTranslation();

  const placeholderKey = SEARCH_PLACEHOLDERS[pathname];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, { [styles.navLinkActive]: isActive });

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.iconLink, { [styles.iconLinkActive]: isActive });

  const favouritesLink = (
    <NavLink
      to="/favourites"
      className={getIconLinkClass}
      aria-label={t('header.favourites')}
    >
      <span className={styles.iconBox}>
        <img src={favouritesIcon} alt="" className="icon" />

        {!!favouriteIds.length && (
          <span className={styles.counter}>{favouriteIds.length}</span>
        )}
      </span>
    </NavLink>
  );

  const cartLink = (
    <NavLink
      to="/cart"
      className={getIconLinkClass}
      aria-label={t('header.cart')}
    >
      <span className={styles.iconBox}>
        <img src={shoppingBagIcon} alt="" className="icon" />

        {!!totalQuantity && (
          <span className={styles.counter}>{totalQuantity}</span>
        )}
      </span>
    </NavLink>
  );

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Logo className={styles.logo} />

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ titleKey, path }) => (
              <li key={path} className={styles.navItem}>
                <NavLink to={path} className={getNavLinkClass}>
                  {t(titleKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {placeholderKey && (
          <Search
            placeholder={t(placeholderKey)}
            clearLabel={t('search.clear')}
          />
        )}

        <div className={styles.icons}>
          <div className={styles.settings}>
            <ThemeToggle label={t('header.theme')} />
            <LanguageSwitcher />
          </div>

          {favouritesLink}
          {cartLink}

          <button
            type="button"
            className={styles.menuButton}
            aria-label={
              isMenuOpen ? t('header.closeMenu') : t('header.openMenu')
            }
            onClick={() => setIsMenuOpen(open => !open)}
          >
            <img
              src={isMenuOpen ? closeIcon : menuIcon}
              alt=""
              className="icon"
            />
          </button>
        </div>
      </div>

      <aside className={cn(styles.menu, { [styles.menuOpen]: isMenuOpen })}>
        <nav>
          <ul className={styles.menuList}>
            {NAV_LINKS.map(({ titleKey, path }) => (
              <li key={path}>
                <NavLink to={path} className={getNavLinkClass}>
                  {t(titleKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.menuSettings}>
          <ThemeToggle label={t('header.theme')} />
          <LanguageSwitcher />
        </div>

        <div className={styles.menuIcons}>
          {favouritesLink}
          {cartLink}
        </div>
      </aside>
    </header>
  );
};

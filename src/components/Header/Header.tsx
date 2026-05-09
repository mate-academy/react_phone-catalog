import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { LOCALES, TranslationKey } from '../../i18n/translations';
import logo from '../../assets/logo.svg';
import iconHeart from '../../assets/icon-heart.svg';
import iconBag from '../../assets/icon-bag.svg';
import styles from './Header.module.scss';

interface NavItem {
  to: string;
  labelKey: TranslationKey;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', labelKey: 'nav.home', end: true },
  { to: '/phones', labelKey: 'nav.phones' },
  { to: '/tablets', labelKey: 'nav.tablets' },
  { to: '/accessories', labelKey: 'nav.accessories' },
];

export const Header = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggle } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [langOpen]);

  const showSearch = ['/phones', '/tablets', '/accessories', '/favorites'].includes(
    pathname,
  );

  const placeholder = (() => {
    if (pathname === '/phones') return t('search.phones');
    if (pathname === '/tablets') return t('search.tablets');
    if (pathname === '/accessories') return t('search.accessories');
    if (pathname === '/favorites') return t('search.favorites');
    return '';
  })();

  const onQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = new URLSearchParams(searchParams);
    if (e.target.value) {
      next.set('query', e.target.value);
      next.delete('page');
    } else {
      next.delete('query');
    }
    setSearchParams(next);
  };

  const currentLocale = LOCALES.find(l => l.code === locale) ?? LOCALES[0];

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink to="/" className={styles.logo}>
          <img src={logo} alt="Phone Catalog" />
        </NavLink>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map(item => (
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
                  {t(item.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.right}>
        {showSearch && (
          <div className={styles.search}>
            <input
              type="text"
              value={searchParams.get('query') ?? ''}
              onChange={onQuery}
              placeholder={placeholder}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon} aria-hidden>
              {searchParams.get('query') ? '×' : '⌕'}
            </span>
          </div>
        )}

        <div className={styles.lang} ref={langRef}>
          <button
            type="button"
            className={styles.langBtn}
            onClick={() => setLangOpen(o => !o)}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            aria-label={t('aria.language')}
          >
            {currentLocale.short}
          </button>
          {langOpen && (
            <ul className={styles.langMenu} role="listbox">
              {LOCALES.map(l => (
                <li key={l.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={l.code === locale}
                    className={classNames(styles.langOption, {
                      [styles.langOptionActive]: l.code === locale,
                    })}
                    onClick={() => {
                      setLocale(l.code);
                      setLangOpen(false);
                    }}
                  >
                    <span className={styles.langOptionShort}>{l.short}</span>
                    <span>{l.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className={styles.themeBtn}
          onClick={toggle}
          aria-label={t('aria.toggleTheme')}
          title={t('aria.toggleTheme')}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <circle cx="8" cy="8" r="3.2" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M8 1.5v1.7" />
                <path d="M8 12.8v1.7" />
                <path d="M1.5 8h1.7" />
                <path d="M12.8 8h1.7" />
                <path d="M3.4 3.4l1.2 1.2" />
                <path d="M11.4 11.4l1.2 1.2" />
                <path d="M3.4 12.6l1.2-1.2" />
                <path d="M11.4 4.6l1.2-1.2" />
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <path
                d="M13.5 9.7A5.5 5.5 0 0 1 6.3 2.5a5.5 5.5 0 1 0 7.2 7.2z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            classNames(styles.iconLink, {
              [styles.iconLinkActive]: isActive,
            })
          }
          aria-label={t('aria.favorites')}
        >
          <img src={iconHeart} alt="" className={styles.icon} />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.iconLink, {
              [styles.iconLinkActive]: isActive,
            })
          }
          aria-label={t('aria.cart')}
        >
          <img src={iconBag} alt="" className={styles.icon} />
          {totalQuantity > 0 && (
            <span className={styles.badge}>{totalQuantity}</span>
          )}
        </NavLink>
      </div>
    </header>
  );
};

import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { getProducts } from '../../api/products';
import { Category } from '../../types/Product';
import { Icon } from '../Icon';
import { assetUrl } from '../../utils/assets';
import { SearchField } from '../SearchField';
import styles from './Header.module.scss';

const links = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

function readTheme() {
  try {
    return localStorage.getItem('nice-gadgets-theme') === 'dark';
  } catch {
    return false;
  }
}

export const Header = () => {
  const { favorites, cartQuantity } = useShop();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(readTheme);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [detailsCategory, setDetailsCategory] = useState<Category | null>(null);
  const category = pathname.slice(1);
  const showSearch = ['phones', 'tablets', 'accessories', 'favorites'].includes(
    category,
  );

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let active = true;

    setDetailsCategory(null);

    if (pathname.startsWith('/product/')) {
      const itemId = pathname.slice('/product/'.length);

      getProducts()
        .then(products => {
          if (active) {
            setDetailsCategory(
              products.find(product => product.itemId === itemId)?.category ||
                null,
            );
          }
        })
        .catch(() => {
          // Keep navigation usable while the product page handles load errors.
        });
    }

    return () => {
      active = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', closeOnEscape);

    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';

    try {
      localStorage.setItem('nice-gadgets-theme', dark ? 'dark' : 'light');
    } catch {
      // Theme switching still works without persistent browser storage.
    }
  }, [dark]);

  return (
    <header
      className={`${styles.header} ${showSearch ? styles.searchHeader : ''} ${menuOpen ? styles.menuOpen : ''}`}
    >
      <Link className={styles.logo} to="/" aria-label="Nice Gadgets home">
        <picture>
          <source
            media="(max-width: 1199px)"
            srcSet={assetUrl(
              `img/figma-assets/logo-mobile${dark ? '-dark' : ''}.svg`,
            )}
          />
          <img
            src={assetUrl(
              `img/figma-assets/logo-header${dark ? '-dark' : ''}.svg`,
            )}
            alt="NICE GADGETS"
          />
        </picture>
      </Link>
      <nav
        id="main-navigation"
        className={`${styles.navigation} ${menuOpen ? styles.open : ''}`}
        aria-label="Main navigation"
      >
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive || link.to === `/${detailsCategory}` ? styles.active : ''
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      {showSearch && (
        <div className={styles.searchContainer}>
          <SearchField key={pathname} category={category} />
        </div>
      )}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.action}
          aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={dark}
          title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={() => setDark(value => !value)}
        >
          <Icon name={dark ? 'sun' : 'moon'} />
        </button>
        <NavLink
          to="/favorites"
          aria-label={`Favorites, ${favorites.length} products`}
          className={({ isActive }) =>
            `${styles.action} ${styles.shopAction} ${isActive ? styles.active : ''}`
          }
        >
          <Icon name="heart" />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          aria-label={`Cart, ${cartQuantity} items`}
          className={({ isActive }) =>
            `${styles.action} ${styles.shopAction} ${isActive ? styles.active : ''}`
          }
        >
          <Icon name="cart" />
          {cartQuantity > 0 && (
            <span className={styles.badge}>{cartQuantity}</span>
          )}
        </NavLink>
        <button
          ref={menuButtonRef}
          className={`${styles.action} ${styles.menuButton}`}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(value => !value)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
};

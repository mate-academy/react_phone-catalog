// src/components/Navbar/Navbar.tsx
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import styles from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';
import logoMobile from '../../assets/img/phones/Logo_mobile.png';
import logoDesktop from '../../assets/img/phones/Logo_desktop.png';
import CartWhite from '../../assets/img/Cart-white.svg?react';
import FavouritesWhite from '../../assets/img/Favourites-white.svg?react';
import CartDark from '../../assets/img/Cart-dark.svg?react';
import FavouritesDark from '../../assets/img/Favourites-dark.svg?react';
import { useCart } from '../../pages/ShoppingCart/cartContext';
import { useFavorites } from '../../pages/Favorites/FavoritesContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { MobileMenu } from './Mobile';

type LinkItem = { id: string; label: string; href: string };
type Props = { links?: LinkItem[] };

export default function Navbar({ links }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const defaultLinks: LinkItem[] = useMemo(
    () => [
      { id: 'home', label: 'HOME', href: '/' },
      { id: 'phones', label: 'PHONES', href: '/phones' },
      { id: 'tablets', label: 'TABLETS', href: '/tablets' },
      { id: 'accessories', label: 'ACCESSORIES', href: '/accessories' },
    ],
    [],
  );

  const effectiveLinks = links ?? defaultLinks;

  const toggle = useCallback(() => setIsOpen(v => !v), []);
  const close = useCallback(() => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1200) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  const location = useLocation();
  const { totalQty } = useCart();
  const { favorites } = useFavorites();
  const { theme } = useTheme();

  const CartIcon = theme === 'light' ? CartWhite : CartDark;
  const FavIcon = theme === 'light' ? FavouritesWhite : FavouritesDark;

  return (
    <header
      className={`${styles.navbar} ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}
    >
      <div className={styles.leftGroup}>
        <Link
          to="/"
          onClick={close}
          aria-label="Ir para home"
          className={styles.logoLink}
        >
          <picture>
            <source srcSet={logoDesktop} media="(min-width: 640px)" />
            <img src={logoMobile} alt="Logo" className={styles.logo} />
          </picture>
        </Link>

        <nav id="primary-navigation" className={styles.menu} role="navigation">
          <ul className={styles.menuList}>
            {effectiveLinks.map(link => {
              const isActive = location.pathname === link.href;

              return (
                <li key={link.id}>
                  <Link
                    to={link.href}
                    onClick={close}
                    aria-current={isActive ? 'page' : undefined}
                    className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <button
        ref={hamburgerRef}
        className={styles.hamburger}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={String(isOpen)}
        onClick={toggle}
        type="button"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <div className={styles.containerIcon}>
        <div className={styles.iconRightGroup}>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <Link
          to="/favorites"
          className={styles.iconButton}
          aria-label="Favoritos"
        >
          <FavIcon className={styles.iconFavourites} />
          {favorites.length > 0 && (
            <span className={styles.favBadge}>{favorites.length}</span>
          )}
        </Link>
        <Link to="/cart" className={styles.iconButton} aria-label="Carrinho">
          <CartIcon className={styles.iconCart} />
          {totalQty > 0 && <span className={styles.cartBadge}>{totalQty}</span>}
        </Link>
      </div>

      {isOpen && <MobileMenu links={effectiveLinks} onClose={close} />}
    </header>
  );
}

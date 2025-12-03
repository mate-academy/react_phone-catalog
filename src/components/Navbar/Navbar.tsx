// src/components/Navbar/Navbar.tsx

// ======================
// BLOCO IMPORT
// ======================
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
import cartMobile from '../../assets/img/Cart.svg';
import favouritesMobile from '../../assets/img/Favourites.svg';
import { useCart } from '../../pages/ShoppingCart/cartContext';
import { useFavorites } from '../../pages/Favorites/FavoritesContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

// ======================
// BLOCO TYPES
// ======================
type LinkItem = { id: string; label: string; href: string };
type Props = { links?: LinkItem[] };

// Type guard to avoid `any` and satisfy ESLint
const isLinkItem = (obj: unknown): obj is LinkItem => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const rec = obj as Record<string, unknown>;

  return (
    typeof rec.id === 'string' &&
    typeof rec.label === 'string' &&
    typeof rec.href === 'string'
  );
};

// ======================
// BLOCO COMPONENTE (export default)
// ======================
export default function Navbar({ links }: Props): JSX.Element {
  // BLOCO STATE
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // BLOCO REFS (para a11y / foco)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  // BLOCO VALIDATION (runtime leve) sem utilizar `any`
  const validateLinks = (maybe: unknown): LinkItem[] | null => {
    if (!Array.isArray(maybe)) {
      return null;
    }

    for (const item of maybe) {
      if (!isLinkItem(item)) {
        return null;
      }
    }

    return maybe as LinkItem[];
  };

  // BLOCO DEFAULT LINKS (runtime)
  const defaultLinks: LinkItem[] = useMemo(
    () => [
      { id: 'home', label: 'HOME', href: '/' },
      { id: 'phones', label: 'PHONES', href: '/phones' },
      { id: 'tablets', label: 'TABLETS', href: '/tablets' },
      { id: 'accessories', label: 'ACCESSORIES', href: '/accessories' },
    ],
    [],
  );

  // BLOCO effectiveLinks com useMemo para evitar recomputações desnecessárias
  const effectiveLinks: LinkItem[] = useMemo(() => {
    const validated = validateLinks(links);

    return validated ?? defaultLinks;
  }, [links, defaultLinks]);

  // BLOCO HANDLERS com useCallback para manter referências estáveis
  const toggle = useCallback(() => {
    setIsOpen(v => !v);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // devolver foco ao botão hamburguer para boa experiência de teclado
    hamburgerRef.current?.focus();
  }, []);

  // BLOCO EFFECTS: teclado, resize e foco
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1200) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // BLOCO EFFECT: mover foco para o primeiro link quando abrir
  useEffect(() => {
    if (isOpen) {
      const id = window.setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 0);

      return () => window.clearTimeout(id);
    }

    return;
  }, [isOpen]);

  // BLOCO EFFECT: evitar scroll do body quando menu aberto
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;

      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prev;
      };
    }

    return;
  }, [isOpen]);

  // BLOCO RENDER HELPERS
  const location = useLocation();

  const renderLinks = useCallback(
    (items: LinkItem[]) =>
      items.map((link, idx) => {
        const isActive = location.pathname === link.href;

        return (
          <li key={link.id}>
            <div className={styles.linkContainer}>
              <Link
                to={link.href}
                onClick={close}
                ref={idx === 0 ? firstLinkRef : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                {link.label}
              </Link>
            </div>
          </li>
        );
      }),
    [close, location.pathname],
  );

  // ======================
  // BLOCO CART (consome contexto do carrinho)
  // ======================
  const { totalQty } = useCart();

  // BLOCO FAVORITES (consome contexto de favoritos)
  const { favorites } = useFavorites();

  // BLOCO RENDER
  return (
    <header className={styles.navbar}>
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
      </div>

      <button
        ref={hamburgerRef}
        className={styles.hamburger}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={String(isOpen)}
        aria-controls="primary-navigation"
        onClick={toggle}
        type="button"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <nav
        id="primary-navigation"
        className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
        aria-hidden={String(!isOpen)}
        role="navigation"
      >
        <ul className={styles.menuList}>{renderLinks(effectiveLinks)}</ul>
      </nav>

      {/* ======================
          BLOCO ICONS (Favourites + Cart com badge e rota /cart)
          ====================== */}
      <div className={styles.containerIcon}>
        <Link
          to="/favoritos"
          className={styles.iconButton}
          aria-label="Favoritos"
          data-testid="nav-favorites-link"
        >
          <img
            src={favouritesMobile}
            alt="Ícone Favoritos"
            className={styles.iconFavourites}
          />
          {favorites.length > 0 && (
            <span
              className={styles.favBadge}
              aria-live="polite"
              data-testid="nav-favorites-qty"
            >
              {favorites.length}
            </span>
          )}
        </Link>
        <Link
          to="/cart"
          className={styles.iconButton}
          aria-label="Ver carrinho"
          data-testid="nav-cart-link"
        >
          <img
            src={cartMobile}
            alt="Ícone Carrinho"
            className={styles.iconCart}
          />
          {totalQty > 0 && (
            <span
              className={styles.cartBadge}
              aria-live="polite"
              data-testid="nav-cart-qty"
            >
              {totalQty}
            </span>
          )}
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

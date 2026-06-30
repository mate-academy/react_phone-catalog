import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Navbar } from './components/Navbar';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import { HeartIcon, CartIcon, MenuIcon, CloseIcon } from '../../ui/Icons/Icons';
import styles from './Header.module.scss';
import logo from '../../../../../public/img/Logo.svg';

interface ActionButtonsProps {
  buttonClass: string;
  activeClass: string;
  favoritesCount: number;
  cartCount: number;
  currentPath: string;
}

const ActionButtons = ({
  buttonClass,
  activeClass,
  favoritesCount,
  cartCount,
  currentPath,
}: ActionButtonsProps) => (
  <>
    <Link
      to="/favorites"
      className={cn(buttonClass, {
        [activeClass]: currentPath === '/favorites',
      })}
      aria-label={`Favoritos (${favoritesCount})`}
    >
      <span className={styles.iconWrapper}>
        <HeartIcon />
        {favoritesCount > 0 && (
          <span className={styles.badge}>{favoritesCount}</span>
        )}
      </span>
    </Link>

    <Link
      to="/cart"
      className={cn(buttonClass, {
        [activeClass]: currentPath === '/cart',
      })}
      aria-label={`Carrinho (${cartCount})`}
    >
      <span className={styles.iconWrapper}>
        <CartIcon />
        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
      </span>
    </Link>
  </>
);

// ─── Header ──────────────────────────────────────────────────────────────────

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();

  // Fecha o menu ao navegar
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  // Trava o scroll enquanto o menu mobile está aberto.
  // O cleanup garante que o overflow seja restaurado se o componente desmontar.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const sharedProps = {
    favoritesCount: favorites.length,
    cartCount: cartItems.length,
    currentPath: location.pathname,
  };

  return (
    <header className={styles.header} data-cy="header">
      <div className={styles.row}>
        <div className={styles.left}>
          <Link
            to="/"
            className={styles.logo}
            aria-label="Nice Gadgets — página inicial"
          >
            <img src={logo} alt="" className={styles.logoImg} />
          </Link>

          <Navbar isOpen={isMenuOpen} />
        </div>

        <div className={styles.actions}>
          <div className={styles.desktopActions}>
            <ActionButtons
              buttonClass={styles.iconButton}
              activeClass={styles.iconButtonActive}
              {...sharedProps}
            />
          </div>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-action-bar"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-action-bar"
        className={cn(styles.mobileActions, {
          [styles.mobileActionsOpen]: isMenuOpen,
        })}
      >
        <ActionButtons
          buttonClass={styles.mobileActionButton}
          activeClass={styles.mobileActionButtonActive}
          {...sharedProps}
        />
      </div>
    </header>
  );
};

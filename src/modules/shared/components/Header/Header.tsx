import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Navbar } from './components/Navbar';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import { HeartIcon, CartIcon, MenuIcon, CloseIcon } from '../../ui/Icons/Icons';
import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  return (
    <header className={styles.header} data-cy="header">
      <div className={styles.row}>
        <Link
          to="/"
          className={styles.logo}
          aria-label="Nice Gadgets, ir para a Home"
        >
          Nice<span className={styles.logoAccent}>Gadgets</span>
        </Link>

        <div className={styles.nav}>
          <Navbar isOpen={isMenuOpen} />
        </div>

        <div className={styles.actions}>
          <Link
            to="/favorites"
            className={cn(styles.iconButton, {
              [styles.iconButtonActive]: location.pathname === '/favorites',
            })}
            aria-label={`Favoritos (${favorites.length})`}
          >
            <HeartIcon />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className={cn(styles.iconButton, {
              [styles.iconButtonActive]: location.pathname === '/cart',
            })}
            aria-label={`Carrinho (${cartItems.length})`}
          >
            <CartIcon />
            {cartItems.length > 0 && (
              <span className={styles.badge}>{cartItems.length}</span>
            )}
          </Link>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setIsMenuOpen(open => !open)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MobileMenu.module.css';
import LanguageSwitcher from '../../LanguageSwitcher/LanguageSwitcher';
import ThemeToggle from '../../ThemeToggle/ThemeToggle';
import { useCart } from '../../../pages/ShoppingCart/cartContext';
import { useFavorites } from '../../../pages/Favorites/FavoritesContext';
import { useTheme } from '../../../context/ThemeContext';

import CartWhite from '../../../assets/img/Cart-white.svg?react';
import CartDark from '../../../assets/img/Cart-dark.svg?react';
import FavouritesWhite from '../../../assets/img/Favourites-white.svg?react';
import FavouritesDark from '../../../assets/img/Favourites-dark.svg?react';

interface MobileMenuProps {
  links: { id: string; label: string; href: string }[];
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ links, onClose }) => {
  const { totalQty } = useCart();
  const { favorites } = useFavorites();
  const { theme } = useTheme();

  const CartIcon = theme === 'light' ? CartWhite : CartDark;
  const FavIcon = theme === 'light' ? FavouritesWhite : FavouritesDark;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.containerBg} ${theme === 'light' ? styles.light : styles.dark}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.mobileMenu}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar menu"
            type="button"
          >
            ✕
          </button>

          <div className={styles.iconRow}>
            <div className={styles.iconsLeft}>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className={styles.iconsRigth}>
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
              <Link
                to="/cart"
                className={styles.iconButton}
                aria-label="Carrinho"
              >
                <CartIcon className={styles.iconCart} />
                {totalQty > 0 && (
                  <span className={styles.cartBadge}>{totalQty}</span>
                )}
              </Link>
            </div>
          </div>

          <hr className={styles.divider} />

          <ul className={styles.linkList}>
            {links.map(link => (
              <li key={link.id}>
                <Link
                  to={link.href}
                  onClick={onClose}
                  className={styles.navLink}
                  aria-label={`Ir para ${link.label}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

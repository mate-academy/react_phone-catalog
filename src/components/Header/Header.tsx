import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';
import { useFavorites } from '../../context/FavoritesContext/FavoritesContext';
import styles from './Header.module.scss';

export const Header = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavoritesCount = favorites.length;

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`;

  const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.iconBtn} ${isActive ? styles.activeIconBtn : ''}`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      {/* Використовуємо глобальний container, щоб вирівняти Header із контентом сторінки */}
      <div className={styles.headerContainer}>
        <div className={styles.leftContent}>
          {/* Логотип */}
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            <img
              src="/img/icons/logo.svg"
              alt="Nice Gadgets"
              className={styles.logoImg}
            />
          </Link>

          {/* Навігація */}
          <nav className={styles.nav}>
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getNavLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getNavLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getNavLinkClass}>
              Accessories
            </NavLink>
          </nav>
        </div>

        {/* Права частина з іконками */}
        <div className={styles.actions}>
          <NavLink to="/favorites" className={getIconLinkClass}>
            <div className={styles.iconWrapper}>
              <img src="/img/icons/heart.svg" alt="Favorites" />
              {totalFavoritesCount > 0 && (
                <span className={styles.badge}>{totalFavoritesCount}</span>
              )}
            </div>
          </NavLink>

          <NavLink to="/cart" className={getIconLinkClass}>
            <div className={styles.iconWrapper}>
              <img src="/img/icons/cart.svg" alt="Cart" />
              {totalCartCount > 0 && (
                <span className={styles.badge}>{totalCartCount}</span>
              )}
            </div>
          </NavLink>

          <button
            type="button"
            className={`${styles.burgerBtn} ${isMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </div>

      {/* Мобільна навігація */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={getNavLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

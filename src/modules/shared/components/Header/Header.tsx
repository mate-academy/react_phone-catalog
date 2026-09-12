import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { HeartIcon, HeartFilledIcon, CartIcon } from '../Icons/Icons';
import { Search } from '../Search';
import styles from './Header.module.scss';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? `${styles.navLink} ${styles.navLinkActive}`
    : styles.navLink;
};

export const Header = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo} onClick={closeMenu}>
            <img
              src={`${import.meta.env.BASE_URL}img/Logo.png`}
              alt="Nice Gadgets logo"
              className={styles.logoImg}
            />
          </NavLink>

          <nav className={styles.nav}>
            <NavLink to="/" end className={getNavLinkClass}>
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

        <div className={styles.searchSlot}>
          <Search key={location.pathname} />
        </div>

        <div className={styles.icons}>
          <NavLink
            to="/favorites"
            className={styles.iconLink}
            aria-label="Favorites"
          >
            <span className={styles.iconHeart}>
              {favorites.length > 0 ? (
                <HeartFilledIcon size={20} />
              ) : (
                <HeartIcon size={20} />
              )}
            </span>
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>
          <NavLink to="/cart" className={styles.iconLink} aria-label="Cart">
            <span className={styles.iconCart}>
              <CartIcon size={20} />
            </span>
            {totalQuantity > 0 && (
              <span className={styles.badge}>{totalQuantity}</span>
            )}
          </NavLink>
          <button
            type="button"
            className={styles.burger}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className={styles.mobileMenu} onClick={closeMenu}>
          <NavLink
            to="/phones"
            className={
              location.pathname.startsWith('/phones')
                ? styles.menuLinkActive
                : styles.menuLink
            }
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={
              location.pathname.startsWith('/tablets')
                ? styles.menuLinkActive
                : styles.menuLink
            }
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={
              location.pathname.startsWith('/accessories')
                ? styles.menuLinkActive
                : styles.menuLink
            }
          >
            Accessories
          </NavLink>
          <NavLink
            to="/favorites"
            className={
              location.pathname.startsWith('/favorites')
                ? styles.menuLinkActive
                : styles.menuLink
            }
          >
            Favorites
          </NavLink>
          <NavLink
            to="/cart"
            className={
              location.pathname.startsWith('/cart')
                ? styles.menuLinkActive
                : styles.menuLink
            }
          >
            Cart
          </NavLink>
        </nav>
      )}
    </>
  );
};

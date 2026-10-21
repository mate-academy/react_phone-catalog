import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { getAssetUrl } from '../../utils/assets';
import { Icon } from '../Icon';
import styles from './Header.module.scss';

export const Header = () => {
  const { favorites } = useFavorites();
  const { totalCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.mobileNavLink} ${styles.active}`
      : styles.mobileNavLink;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.leftContent}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={getAssetUrl('img/logo.svg')} alt="Nice Gadgets Logo" />
        </Link>

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

      <div className={styles.rightContent}>
        <NavLink to="/favorites" className={styles.iconBtn}>
          <img src={getAssetUrl('img/icons/favourites.svg')} alt="Favorites" />
          {favorites.length > 0 && (
            <span className={styles.badge}>{favorites.length}</span>
          )}
        </NavLink>

        <NavLink to="/cart" className={styles.iconBtn}>
          <img src={getAssetUrl('img/icons/shopping-bag.svg')} alt="Cart" />
          {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
        </NavLink>
      </div>

      <button
        type="button"
        className={styles.burger}
        onClick={() => setIsMenuOpen(prev => !prev)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <Icon name="close" stroke="#0F0F11" />
        ) : (
          <Icon name="menu" stroke="#0F0F11" />
        )}
      </button>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={getMobileNavLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileIcons}>
            <NavLink
              to="/favorites"
              className={styles.mobileIconBtn}
              onClick={closeMenu}
            >
              <img
                src={getAssetUrl('img/icons/favourites.svg')}
                alt="Favorites"
              />
              {favorites.length > 0 && (
                <span className={styles.badge}>{favorites.length}</span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={styles.mobileIconBtn}
              onClick={closeMenu}
            >
              <img src={getAssetUrl('img/icons/shopping-bag.svg')} alt="Cart" />
              {totalCount > 0 && (
                <span className={styles.badge}>{totalCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

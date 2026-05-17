import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { SearchInput } from '../SearchInput';
import { getAssetUrl } from '../../utils/asset';
import styles from './Header.module.scss';

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, { [styles.active]: isActive });

export const Header = () => {
  const { ids } = useFavorites();
  const { totalQuantity } = useCart();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showSearch =
    pathname.startsWith('/phones') ||
    pathname.startsWith('/tablets') ||
    pathname.startsWith('/accessories') ||
    pathname.startsWith('/favorites');

  const favoritesCount = ids.length;
  const cartCount = totalQuantity;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img
            className={styles.logoImg}
            src={getAssetUrl('img/Nice%20Gadgets.png')}
            alt="Nice Gadgets"
          />
        </NavLink>

        <button
          type="button"
          className={styles.mobileToggle}
          onClick={() => setIsMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <img
            src={getAssetUrl('img/Menu.png')}
            alt="Menu"
            className={styles.menuIcon}
          />
        </button>

        <nav className={styles.nav}>
          <NavLink to="/" className={getNavClass} end>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavClass}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavClass}>
            Tablets
          </NavLink>
          <NavLink to="/accessories" className={getNavClass}>
            Accessories
          </NavLink>
        </nav>

        {showSearch && (
          <div className={styles.search}>
            <SearchInput />
          </div>
        )}

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.iconLink, styles.link, {
                [styles.active]: isActive,
              })
            }
            aria-label="Favorites"
          >
            <span className={styles.iconWrapper}>
              <img
                className={styles.iconHeader}
                src={getAssetUrl('img/Favourites%20(Heart%20Like).png')}
                alt="Favorites"
              />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.iconLink, styles.link, {
                [styles.active]: isActive,
              })
            }
            aria-label="Cart"
          >
            <span className={styles.iconWrapper}>
              <img
                className={styles.iconHeader}
                src={getAssetUrl('img/Group%2017.png')}
                alt="Cart"
              />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </span>
          </NavLink>
        </div>
      </div>

      <div
        className={classNames(styles.mobileOverlay, {
          [styles.mobileOverlayOpen]: isMenuOpen,
        })}
        onClick={closeMenu}
      />
      <aside
        id="mobile-menu"
        className={classNames(styles.mobileMenu, {
          [styles.mobileMenuOpen]: isMenuOpen,
        })}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileHeader}>
          <NavLink
            to="/"
            className={styles.mobileLogo}
            onClick={closeMenu}
            aria-label="Home"
          >
            <img
              className={styles.mobileLogoImg}
              src={getAssetUrl('img/Nice%20Gadgets.png')}
              alt="Nice Gadgets"
            />
          </NavLink>
          <button
            type="button"
            className={styles.mobileClose}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className={styles.mobileNav}>
          <NavLink to="/" className={getNavClass} end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/phones" className={getNavClass} onClick={closeMenu}>
            Phones
          </NavLink>
          <NavLink to="/tablets" className={getNavClass} onClick={closeMenu}>
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={getNavClass}
            onClick={closeMenu}
          >
            Accessories
          </NavLink>
        </nav>

        <div className={styles.mobileActions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              classNames(styles.iconLink, styles.link, {
                [styles.active]: isActive,
                [styles.mobileActionLink]: true,
              })
            }
            onClick={closeMenu}
          >
            <span className={styles.iconWrapper}>
              <img
                className={styles.iconHeader}
                src={getAssetUrl('img/Favourites%20(Heart%20Like).png')}
                alt="Favorites"
              />
              {favoritesCount > 0 && (
                <span className={styles.badge}>{favoritesCount}</span>
              )}
            </span>
            <span>Favorites</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              classNames(styles.iconLink, styles.link, {
                [styles.active]: isActive,
                [styles.mobileActionLink]: true,
              })
            }
            onClick={closeMenu}
          >
            <span className={styles.iconWrapper}>
              <img
                className={styles.iconHeader}
                src={getAssetUrl('img/Group%2017.png')}
                alt="Cart"
              />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </span>
            <span>Cart</span>
          </NavLink>
        </div>
      </aside>
    </header>
  );
};

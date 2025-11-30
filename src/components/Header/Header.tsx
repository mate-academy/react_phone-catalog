import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { useFavorites } from '../../modules/shared/context/FavoritesContext';
import { useCart } from '../../modules/shared/context/CartContext';
import { useEffect, useState } from 'react';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.link, { [styles['is-active']]: isActive });

const getIconClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconButton, { [styles['is-active']]: isActive });

export const Header = () => {
  const { favorites } = useFavorites();
  const { totalCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.logo}>
            <img src="img/logo/Logo.png" alt="SiteLogo.png" />
          </NavLink>

          <nav className={styles.nav}>
            <NavLink to="/" className={getLinkClass}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass}>
              Tablets
            </NavLink>
            <NavLink to="/accessories" className={getLinkClass}>
              Accessories
            </NavLink>
          </nav>
        </div>

        <div className={styles.right}>
          <div className={styles.icons}>
            <NavLink to="/favorites" className={getIconClass}>
              <div className={styles.iconWrapper}>
                <img src="img/icons/Favorites.png" alt="Favorites" />
                {favorites.length > 0 && (
                  <span className={styles.iconBadge}>{favorites.length}</span>
                )}
              </div>
            </NavLink>
            <NavLink to="/cart" className={getIconClass}>
              <div className={styles.iconWrapper}>
                <img
                  src="img/icons/Shoppingbag.png"
                  alt="ShoppingBagIcon.png"
                />
                {totalCount > 0 && (
                  <span className={styles.iconBadge}>{totalCount}</span>
                )}
              </div>
            </NavLink>
          </div>
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <img src="img/icons/Close.png" alt="Close" />
            ) : (
              <img src="img/icons/Menu.png" alt="Menu" />
            )}
          </button>
        </div>
      </div>

      <div
        className={classNames(styles.mobileMenu, {
          [styles.isOpen]: isMenuOpen,
        })}
      >
        <nav className={styles.mobileNav}>
          <NavLink to="/" className={getLinkClass}>
            <span>Home</span>
          </NavLink>
          <NavLink to="/phones" className={getLinkClass}>
            <span>Phones</span>
          </NavLink>
          <NavLink to="/tablets" className={getLinkClass}>
            <span>Tablets</span>
          </NavLink>
          <NavLink to="/accessories" className={getLinkClass}>
            <span>Accessories</span>
          </NavLink>
        </nav>

        <div className={styles.mobileIcons}>
          <NavLink to="/favorites" className={getIconClass}>
            <div className={styles.iconWrapper}>
              <img src="img/icons/Favorites.png" alt="Favorites" />
              {favorites.length > 0 && (
                <span className={styles.iconBadge}>{favorites.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink to="/cart" className={getIconClass}>
            <div className={styles.iconWrapper}>
              <img src="img/icons/Shoppingbag.png" alt="ShoppingBagIcon.png" />
              {totalCount > 0 && (
                <span className={styles.iconBadge}>{totalCount}</span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

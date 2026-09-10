import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import styles from './Header.module.scss';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.header__link} ${styles.header__linkActive}`
      : styles.header__link;

  const getActionClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${styles.header__actionBtn} ${styles.header__actionBtnActive}`
      : styles.header__actionBtn;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__left}>
          <NavLink to="/" className={styles.header__logo} onClick={closeMenu}>
            <img
              src="img/icons/Logo.svg"
              alt="Nice Gadgets Logo"
              className={styles.header__logoImg}
            />
          </NavLink>

          <nav className={styles.header__nav}>
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

        <div className={styles.header__actions}>
          {/* Іконки для Desktop та Tablet */}
          <div className={styles.header__desktopActions}>
            <NavLink to="/favorites" className={getActionClass}>
              <img
                src="img/icons/Favourites.svg"
                alt="Favorites"
                className={styles.header__icon}
              />
              {favorites.length > 0 && (
                <span className={styles.header__badge}>{favorites.length}</span>
              )}
            </NavLink>
            <NavLink to="/cart" className={getActionClass}>
              <img
                src="img/icons/Cart.svg"
                alt="Cart"
                className={styles.header__icon}
              />
              {totalCartItems > 0 && (
                <span className={styles.header__badge}>{totalCartItems}</span>
              )}
            </NavLink>
          </div>

          {/* Бургер-кнопка тільки для Mobile */}
          <button
            type="button"
            className={styles.header__burger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img
              src={isMenuOpen ? '/img/icons/Close.svg' : '/img/icons/Menu.svg'}
              alt="Menu"
              className={styles.header__icon}
            />
          </button>
        </div>
      </header>

      {/* Мобільне меню за Figma */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileMenu__nav}>
            <NavLink to="/" className={getLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/phones" className={getLinkClass} onClick={closeMenu}>
              Phones
            </NavLink>
            <NavLink to="/tablets" className={getLinkClass} onClick={closeMenu}>
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={getLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileMenu__actions}>
            <NavLink
              to="/favorites"
              className={getActionClass}
              onClick={closeMenu}
            >
              <img
                src="img/icons/Favourites.svg"
                alt="Favorites"
                className={styles.header__icon}
              />
              {favorites.length > 0 && (
                <span className={styles.header__badge}>{favorites.length}</span>
              )}
            </NavLink>
            <NavLink to="/cart" className={getActionClass} onClick={closeMenu}>
              <img
                src="img/icons/Cart.svg"
                alt="Cart"
                className={styles.header__icon}
              />
              {totalCartItems > 0 && (
                <span className={styles.header__badge}>{totalCartItems}</span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

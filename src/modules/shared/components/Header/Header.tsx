import React, { useState, useContext, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { CartContext } from '../../../../context/CartContext';
import { FavoritesContext } from '../../../../context/FavoritesContext';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.links} ${styles.active}` : styles.links;

const getIconsClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.menuIcon} ${styles.active}` : styles.menuIcon;

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const closeMenu = () => setOpenMenu(false);

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  useEffect(() => {
    const tablet = window.matchMedia('(min-width: 640px)');

    const handleChange = () => {
      if (tablet.matches) {
        setOpenMenu(false);
      }
    };

    tablet.addEventListener('change', handleChange);

    return () => tablet.removeEventListener('change', handleChange);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={'/'} onClick={closeMenu}>
          <img src="icons/logo.svg" alt="Logo" className={styles.logoImg} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <NavLink to={'/'} className={getLinkClass} end>
          Home
        </NavLink>
        <NavLink to={'/phones'} className={getLinkClass}>
          Phones
        </NavLink>
        <NavLink to={'/tablets'} className={getLinkClass}>
          Tablets
        </NavLink>
        <NavLink to={'/accessories'} className={getLinkClass}>
          Accessories
        </NavLink>
      </nav>

      <button
        className={`${styles.icon} ${styles.burger}`}
        type="button"
        onClick={() => setOpenMenu(!openMenu)}
      >
        <img
          src={openMenu ? 'icons/close.svg' : 'icons/menu.svg'}
          alt={openMenu ? 'Close menu' : 'Open menu'}
        />
      </button>

      <div className={styles.icons}>
        {/* change letter */}
        <NavLink to={'/favorites'} className={styles.icon}>
          <span className={styles.iconWrapper}>
            <img src="icons/heaer.svg" alt="Favorites" />
            {favoritesCount > 0 && (
              <span className={styles.badge}>{favoritesCount}</span>
            )}
          </span>
        </NavLink>
        <NavLink to={'/cart'} className={styles.icon}>
          <span className={styles.iconWrapper}>
            <img src="icons/shopping-bag.svg" alt="Cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </span>
        </NavLink>
      </div>

      {openMenu && (
        <div className={styles.menu}>
          <nav className={styles.menuNav}>
            <NavLink to={'/'} className={getLinkClass} onClick={closeMenu} end>
              Home
            </NavLink>
            <NavLink
              to={'/phones'}
              className={getLinkClass}
              onClick={closeMenu}
            >
              Phones
            </NavLink>
            <NavLink
              to={'/tablets'}
              className={getLinkClass}
              onClick={closeMenu}
            >
              Tablets
            </NavLink>
            <NavLink
              to={'/accessories'}
              className={getLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.menuIcons}>
            <NavLink
              to={'/favorites'}
              className={getIconsClass}
              onClick={closeMenu}
            >
              <span className={styles.iconWrapper}>
                <img src="icons/heaer.svg" alt="Favorites" />
                {favoritesCount > 0 && (
                  <span className={styles.badge}>{favoritesCount}</span>
                )}
              </span>
            </NavLink>
            <NavLink to={'/cart'} className={getIconsClass} onClick={closeMenu}>
              <span className={styles.iconWrapper}>
                <img src="icons/shopping-bag.svg" alt="Cart" />
                {cartCount > 0 && (
                  <span className={styles.badge}>{cartCount}</span>
                )}
              </span>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

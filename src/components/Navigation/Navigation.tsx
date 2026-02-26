import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import logo from '../../icons/logo.png';
import burgerMenu from '../../icons/burger-menu.png';
import heartIcon from '../../items/vector_heart.png';
import cartIcon from '../../items/vector_shop.png';
import { useFavourites } from '../../context/Favouritescontext';
import { useCart } from '../../context/Cartcontext';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { favourites } = useFavourites();
  const { totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isPhonesActive =
    location.pathname === '/phones' ||
    (location.pathname.startsWith('/product/') &&
      (location.pathname.includes('iphone') ||
        location.pathname.includes('samsung') ||
        location.pathname.includes('motorola')));

  const isTabletsActive =
    location.pathname === '/tablets' ||
    (location.pathname.startsWith('/product/') &&
      location.pathname.includes('ipad'));

  const isAccessoriesActive =
    location.pathname === '/accessories' ||
    (location.pathname.startsWith('/product/') &&
      location.pathname.includes('watch'));

  return (
    <>
      <nav className={styles.navigation}>
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Nice Gadgets Logo" />
        </Link>

        <ul className={styles.nav_links}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.nav_link} ${isActive ? styles.nav_link_active : ''}`
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={() =>
                `${styles.nav_link} ${isPhonesActive ? styles.nav_link_active : ''}`
              }
            >
              PHONES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={() =>
                `${styles.nav_link} ${isTabletsActive ? styles.nav_link_active : ''}`
              }
            >
              TABLETS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={() =>
                `${styles.nav_link} ${isAccessoriesActive ? styles.nav_link_active : ''}`
              }
            >
              ACCESSORIES
            </NavLink>
          </li>
        </ul>

        <div className={styles.nav_icons}>
          <Link
            to="/favourites"
            className={`${styles.icon_wrapper} ${location.pathname === '/favourites' ? styles.icon_wrapper_active : ''}`}
          >
            <img className={styles.icon} src={heartIcon} alt="Favourites" />
            {favourites.length > 0 && (
              <span className={styles.badge}>{favourites.length}</span>
            )}
          </Link>

          <Link
            to="/cart"
            className={`${styles.icon_wrapper} ${location.pathname === '/cart' ? styles.icon_wrapper_active : ''}`}
          >
            <img className={styles.icon} src={cartIcon} alt="Cart" />
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>
        </div>

        <div className={styles['burger-wrapper']}>
          <button
            className={styles['burger-button']}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <img src={burgerMenu} alt="burger-menu" />
          </button>
        </div>

        <hr className={styles.hr} />
      </nav>

      {menuOpen && (
        <div className={styles['mobile-menu']}>
          <div className={styles['mobile-menu__header']}>
            <Link to="/" onClick={closeMenu}>
              <img className={styles.logo} src={logo} alt="Nice Gadgets Logo" />
            </Link>
            <button
              className={styles['mobile-menu__close']}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul className={styles['mobile-menu__links']}>
            <li>
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles['mobile-menu__link']} ${isActive ? styles['mobile-menu__link--active'] : ''}`
                }
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                onClick={closeMenu}
                className={() =>
                  `${styles['mobile-menu__link']} ${isPhonesActive ? styles['mobile-menu__link--active'] : ''}`
                }
              >
                PHONES
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                onClick={closeMenu}
                className={() =>
                  `${styles['mobile-menu__link']} ${isTabletsActive ? styles['mobile-menu__link--active'] : ''}`
                }
              >
                TABLETS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                onClick={closeMenu}
                className={() =>
                  `${styles['mobile-menu__link']} ${isAccessoriesActive ? styles['mobile-menu__link--active'] : ''}`
                }
              >
                ACCESSORIES
              </NavLink>
            </li>
          </ul>

          <div className={styles['mobile-menu__footer']}>
            <Link
              to="/favourites"
              className={`${styles['mobile-menu__icon-wrapper']} ${location.pathname === '/favourites' ? styles['mobile-menu__icon-wrapper--active'] : ''}`}
              onClick={closeMenu}
            >
              <img src={heartIcon} alt="Favourites" />
              {favourites.length > 0 && (
                <span className={styles.badge}>{favourites.length}</span>
              )}
            </Link>
            <Link
              to="/cart"
              className={`${styles['mobile-menu__icon-wrapper']} ${location.pathname === '/cart' ? styles['mobile-menu__icon-wrapper--active'] : ''}`}
              onClick={closeMenu}
            >
              <img src={cartIcon} alt="Cart" />
              {totalItems > 0 && (
                <span className={styles.badge}>{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

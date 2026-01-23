import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFav } from '../../context/FavContext';

export const Header = () => {
  const { cartItems } = useCart();
  const { favItems } = useFav();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- 1. SEARCH LOGIC ---
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Sprawdzamy, czy jesteśmy na stronie, która powinna mieć wyszukiwarkę
  const showSearch =
    location.pathname === '/phones' ||
    location.pathname === '/tablets' ||
    location.pathname === '/accessories' ||
    location.pathname === '/favourites';

  const query = searchParams.get('query') || '';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (newQuery.length === 0) {
      newParams.delete('query');
    } else {
      newParams.set('query', newQuery);
    }

    // Zawsze resetuj stronę do 1 przy zmianie wyszukiwania
    newParams.set('page', '1');

    setSearchParams(newParams);
  };
  // -----------------------

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, {
      [styles.isActive]: isActive,
    });

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* LOGO */}
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src="/img/logo.svg" alt="Nice Gadgets" />
        </Link>

        {/* DESKTOP NAV */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink to="/" end className={getLinkClass}>
                Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/phones" className={getLinkClass}>
                Phones
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/tablets" className={getLinkClass}>
                Tablets
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/accessories" className={getLinkClass}>
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.rightSection}>
        {/*SEARCH INPUT (Tylko na wybranych stronach) */}
        {showSearch && (
          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder={`Search in ${location.pathname.slice(1)}...`}
              value={query}
              onChange={handleSearchChange}
            />
            <div className={styles.searchIcon}>
              <img src="/img/icons/Search.svg" alt="Search" />
            </div>
            {/* Przycisk czyszczenia (opcjonalny, jeśli query nie jest puste) */}
            {query && (
              <button
                className={styles.clearSearch}
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);

                  newParams.delete('query');
                  setSearchParams(newParams);
                }}
              >
                <img src="/img/icons/close.svg" alt="Clear" />
              </button>
            )}
          </div>
        )}

        {/* DESKTOP ICONS */}
        <div className={styles.icons}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              cn(styles.iconLink, { [styles.isActive]: isActive })
            }
          >
            <div className={styles.iconWrapper}>
              <img src="/img/icons/Heart.svg" alt="Favourites" />
              {favItems.length > 0 && (
                <span className={styles.badge}>{favItems.length}</span>
              )}
            </div>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn(styles.iconLink, { [styles.isActive]: isActive })
            }
          >
            <div className={styles.iconWrapper}>
              <img src="/img/icons/cart.svg" alt="Cart" />
              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </div>
          </NavLink>
        </div>

        {/* BURGER BUTTON */}
        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src={isMenuOpen ? '/img/icons/close.svg' : '/img/icons/menu.svg'}
            alt="Menu"
          />
        </button>
      </div>

      {/* MENU MOBILNE */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <NavLink to="/" end className={getLinkClass} onClick={closeMenu}>
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

          <div className={styles.mobileIcons}>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                cn(styles.mobileIconLink, { [styles.isActive]: isActive })
              }
              onClick={closeMenu}
            >
              <div className={styles.iconWrapper}>
                <img src="/img/icons/Heart.svg" alt="Favourites" />
                {favItems.length > 0 && (
                  <span className={styles.badge}>{favItems.length}</span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles.mobileIconLink, { [styles.isActive]: isActive })
              }
              onClick={closeMenu}
            >
              <div className={styles.iconWrapper}>
                <img src="/img/icons/cart.svg" alt="Cart" />
                {cartItems.length > 0 && (
                  <span className={styles.badge}>{cartItems.length}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

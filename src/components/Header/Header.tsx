import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { useCart } from '../../context/CartContext';
import { useFav } from '../../context/FavContext';

export const Header = () => {
  const { cartItems } = useCart();
  const { favItems } = useFav();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || '',
  );

  // 1. Reset menu przy zmianie strony
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // 2. Reset pola szukaj przy zmianie kategorii
  useEffect(() => {
    setSearchQuery('');
  }, [pathname]);

  // 3. Blokada scrollowania gdy menu otwarte
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // 4. Logika wyszukiwarki (Debounce + URL Sync)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Jeśli jesteśmy na nowej stronie, a pole jest puste -> nie robimy nic lub czyścimy
      if (searchQuery.trim() === '') {
        const newParams = new URLSearchParams(searchParams);

        newParams.delete('query');
        setSearchParams(newParams);
      } else {
        const newParams = new URLSearchParams(searchParams);

        newParams.set('query', searchQuery);
        setSearchParams(newParams);
      }
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const closeMenu = () => setIsMenuOpen(false);

  const showSearch =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories' ||
    pathname === '/favourites';

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.navLink, { [styles.isActive]: isActive });

  const getIconClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.iconLink, { [styles.isActive]: isActive });

  const getMobileIconClass = ({ isActive }: { isActive: boolean }) =>
    cn(styles.mobileIconLink, { [styles.isActive]: isActive });

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img
            src={`${import.meta.env.BASE_URL}/img/logo.svg`}
            alt="Nice Gadgets"
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink to="/" className={getLinkClass}>
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

        {/* WYSZUKIWARKA */}
        {showSearch && (
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search in store..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <div className={styles.searchIconWrapper}>
              <img
                src={`${import.meta.env.BASE_URL}/img/icons/search.svg`}
                alt="Search"
              />
            </div>
          </div>
        )}

        {/* IKONY */}
        <div className={cn(styles.icons, { [styles.pushRight]: !showSearch })}>
          <NavLink to="/favourites" className={getIconClass}>
            <div className={styles.iconWrapper}>
              <img
                src={`${import.meta.env.BASE_URL}/img/icons/favourites.svg`}
                alt="Favourites"
              />
              {favItems.length > 0 && (
                <span className={styles.badge}>{favItems.length}</span>
              )}
            </div>
          </NavLink>
          <NavLink to="/cart" className={getIconClass}>
            <div className={styles.iconWrapper}>
              <img
                src={`${import.meta.env.BASE_URL}/img/icons/cart.svg`}
                alt="Cart"
              />
              {cartItems.length > 0 && (
                <span className={styles.badge}>{cartItems.length}</span>
              )}
            </div>
          </NavLink>
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <img
            src={
              isMenuOpen
                ? `${import.meta.env.BASE_URL}/img/icons/close.svg`
                : `${import.meta.env.BASE_URL}/img/icons/menu.svg`
            }
            alt="Menu"
          />
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
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

          <div className={styles.mobileIcons}>
            <NavLink
              to="/favourites"
              className={getMobileIconClass}
              onClick={closeMenu}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={`${import.meta.env.BASE_URL}/img/icons/favourites.svg`}
                  alt="Favourites"
                />
                {favItems.length > 0 && (
                  <span className={styles.badge}>{favItems.length}</span>
                )}
              </div>
            </NavLink>
            <NavLink
              to="/cart"
              className={getMobileIconClass}
              onClick={closeMenu}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={`${import.meta.env.BASE_URL}/img/icons/cart.svg`}
                  alt="Cart"
                />
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

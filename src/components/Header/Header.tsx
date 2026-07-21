import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../modules/shared/contexts/CartContext';
import { useFavorites } from '../../modules/shared/contexts/FavoritesContext';
import { buildUrl } from '../../modules/shared/utils/buildUrl';

export const Header: React.FC = () => {
  const { totalQuantity } = useCart();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.mobileMenu__link} ${isActive ? styles.active : ''}`;

  const mobileIconClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.mobileMenu__actionLink} ${isActive ? styles.active : ''}`;

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <img src={buildUrl('img/icons/logo-top.png')} alt="Logo" />
        </Link>

        <div className={styles.container}>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <NavLink to="/" end className={navLinkClass}>
                  Home
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink to="/phones" className={navLinkClass}>
                  Phones
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink to="/tablets" className={navLinkClass}>
                  Tablets
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink to="/accessories" className={navLinkClass}>
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.actions}>
            <Link to="/favorites" className={styles.actionLink}>
              <div className={styles.iconContainer}>
                <img
                  src={buildUrl('img/icons/favorite.png')}
                  alt="Favorites"
                  className={styles.icon}
                />

                {favorites.length > 0 && (
                  <span className={styles.badge}>{favorites.length}</span>
                )}
              </div>
            </Link>
            <Link to="/cart" className={styles.actionLink}>
              <div className={styles.iconContainer}>
                <img
                  src={buildUrl('img/icons/cart.png')}
                  alt="Shopping Cart"
                  className={styles.icon}
                />

                {totalQuantity > 0 && (
                  <span className={styles.badge}>{totalQuantity}</span>
                )}
              </div>
            </Link>

            <button
              className={styles.burgerButton}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <img
                src={buildUrl('img/icons/burger-menu.png')}
                alt="Burger Menu"
              />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenu__header}>
            <Link to="/" className={styles.logo} onClick={closeMenu}>
              <img src={buildUrl('img/icons/logo-top.png')} alt="Logo" />
            </Link>

            <button
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <img
                src={buildUrl('img/icons/close.png')}
                alt="Close"
                className={styles.closeButton__icon}
              />
            </button>
          </div>

          <nav className={styles.mobileMenu__nav}>
            <NavLink to="/" end className={mobileLinkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={mobileLinkClass}
              onClick={closeMenu}
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={mobileLinkClass}
              onClick={closeMenu}
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={mobileLinkClass}
              onClick={closeMenu}
            >
              Accessories
            </NavLink>
          </nav>

          <div className={styles.mobileMenu__actions}>
            <NavLink
              to="/favorites"
              className={mobileIconClass}
              onClick={closeMenu}
            >
              <img
                src={buildUrl('img/icons/favorite.png')}
                alt="Favorites"
                className={styles.icon}
              />
            </NavLink>
            <NavLink to="/cart" className={mobileIconClass} onClick={closeMenu}>
              <img
                src={buildUrl('img/icons/cart.png')}
                alt="Shopping Cart"
                className={styles.icon}
              />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

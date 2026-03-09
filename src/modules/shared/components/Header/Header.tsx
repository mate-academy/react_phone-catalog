import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import { useTheme } from '../../../../context/ThemeContext';
import { getImg } from '../../../../utils/getImageUrl';
import styles from './Header.module.scss';

const getNavLinkClass = (
  isActive: boolean,
  baseClass: string,
  activeClass: string,
) => (isActive ? `${baseClass} ${activeClass}` : baseClass);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalCount: cartCount } = useCart();
  const { totalCount: favCount } = useFavorites();
  const { isDark, toggleTheme } = useTheme();

  const handleMenuToggle = () => setIsMenuOpen(prev => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink to="/" className={styles.logo} onClick={handleMenuClose}>
          <img src={getImg('/img/logo.svg')} alt="Nice Gadgets" />
        </NavLink>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    styles.navLink,
                    styles.navLinkActive,
                  )
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    styles.navLink,
                    styles.navLinkActive,
                  )
                }
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    styles.navLink,
                    styles.navLinkActive,
                  )
                }
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    styles.navLink,
                    styles.navLinkActive,
                  )
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.icons}>
        {/* Button for swithing theme */}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <img
            src={
              isDark
                ? getImg('/img/icons/sun.svg')
                : getImg('/img/icons/moon.svg')
            }
            alt="theme"
          />
        </button>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            getNavLinkClass(isActive, styles.iconLink, styles.iconLinkActive)
          }
        >
          <div className={styles.iconWrapper}>
            <img
              src={getImg('/img/icons/fav-heart-like.svg')}
              alt="favorite icon"
            />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            getNavLinkClass(isActive, styles.iconLink, styles.iconLinkActive)
          }
        >
          <div className={styles.iconWrapper}>
            <img
              src={getImg('/img/icons/shopping-bag-cart.svg')}
              alt="shopping bag cart"
            />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </div>
        </NavLink>
      </div>

      {/* Burger */}
      <button
        className={styles.burger}
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        <img
          src={
            isMenuOpen
              ? getImg('/img/icons/close.svg')
              : getImg('/img/icons/menu.svg')
          }
          alt="menu"
        />
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  )
                }
                onClick={handleMenuClose}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  )
                }
                onClick={handleMenuClose}
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  )
                }
                onClick={handleMenuClose}
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  getNavLinkClass(
                    isActive,
                    styles.mobileNavLink,
                    styles.mobileNavLinkActive,
                  )
                }
                onClick={handleMenuClose}
              >
                Accessories
              </NavLink>
            </li>
          </ul>

          {/* Bottom-icons */}
          <div className={styles.mobileIcons}>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                getNavLinkClass(
                  isActive,
                  styles.mobileIconLink,
                  styles.mobileIconLinkActive,
                )
              }
              onClick={handleMenuClose}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={getImg('/img/icons/fav-heart-like.svg')}
                  alt="favorites"
                />
                {favCount > 0 && (
                  <span className={styles.badge}>{favCount}</span>
                )}
              </div>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                getNavLinkClass(
                  isActive,
                  styles.mobileIconLink,
                  styles.mobileIconLinkActive,
                )
              }
              onClick={handleMenuClose}
            >
              <div className={styles.iconWrapper}>
                <img
                  src={getImg('/img/icons/shopping-bag-cart.svg')}
                  alt="cart"
                />
                {cartCount > 0 && (
                  <span className={styles.badge}>{cartCount}</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

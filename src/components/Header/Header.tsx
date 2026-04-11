import styles from './Header.module.scss';
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useFavourites } from '../../context/FavouriteContext';
import { useCart } from '../../context/CartContext';

type Props = {
  theme: string;
  toggleTheme: () => void;
};

export const Header: React.FC<Props> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favourites } = useFavourites();
  const { cart } = useCart();

  const favCount = favourites ? favourites.length : 0;
  //const cartCount = cart ? cart.length : 0;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  };

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, [location]);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__left}>
          <Link to="/" className={styles.logo}>
            <img
              src={theme === 'dark' ? './img/LogoDark.svg' : './img/Logo.svg'}
              alt="Logo"
            />
          </Link>

          <nav className={styles.nav}>
            <ul className={styles.nav__list}>
              <li className={styles.nav__item}>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `${styles.nav__link} uppercase ${isActive ? styles.nav__link_active : ''}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink
                  to="/phones"
                  className={({ isActive }) =>
                    `${styles.nav__link} uppercase ${isActive ? styles.nav__link_active : ''}`
                  }
                >
                  Phones
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink
                  to="/tablets"
                  className={({ isActive }) =>
                    `${styles.nav__link} uppercase ${isActive ? styles.nav__link_active : ''}`
                  }
                >
                  Tablets
                </NavLink>
              </li>
              <li className={styles.nav__item}>
                <NavLink
                  to="/accessories"
                  className={({ isActive }) =>
                    `${styles.nav__link} uppercase ${isActive ? styles.nav__link_active : ''}`
                  }
                >
                  Accessories
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.header__right}>
          <div className={styles.desktop_actions}>
            {false && (
              <button
                className={styles.theme_toggle}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                <span className={styles.switch_circle}>
                  {theme === 'dark' ? '☀️' : '🌙'}
                </span>
              </button>
            )}

            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `${styles.icon_btn} ${isActive ? styles.icon_btn_active : ''}`
              }
            >
              <img src="./img/Favourites.svg" alt="Favorites" />
              {favCount > 0 && (
                <span className={styles.badge}>
                  {favCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${styles.icon_btn} ${isActive ? styles.icon_btn_active : ''}`
              }
            >
              <img src="./img/Cart.svg" alt="Cart" />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </NavLink>
          </div>

          <button
            className={styles.burger}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img
              src={isMenuOpen ? './img/Close.svg' : './img/Burger_menu.svg'}
              alt="Menu Icon"
            />
          </button>
        </div>
      </div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menu_open : ''}`}>
        <nav className={styles.menu__nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.menu__link} uppercase ${isActive ? styles.menu__link_active : ''}`
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `${styles.menu__link} uppercase ${isActive ? styles.menu__link_active : ''}`
            }
            onClick={toggleMenu}
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `${styles.menu__link} uppercase ${isActive ? styles.menu__link_active : ''}`
            }
            onClick={toggleMenu}
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `${styles.menu__link} uppercase ${isActive ? styles.menu__link_active : ''}`
            }
            onClick={toggleMenu}
          >
            Accessories
          </NavLink>
        </nav>

        <div className={styles.menu__footer}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `${styles.menu__icon} ${isActive ? styles.menu__icon_active : ''}`
            }
            onClick={toggleMenu}
          >
            <img src="./img/Favourites.svg" alt="Favourites" />
            {favCount > 0 && <span className={styles.badge}>{favCount}</span>}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${styles.menu__icon} ${isActive ? styles.menu__icon_active : ''}`
            }
            onClick={toggleMenu}
          >
            <img src="./img/Shopping_bag.svg" alt="Cart" />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

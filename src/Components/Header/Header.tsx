import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';

type HeaderProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const { pathname } = useLocation();

  const totalItems = cart.reduce(
    (acc, product) => acc + (product.count || 1),
    0,
  );

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.containerNav}>
          <Link to="/" className={styles.logo} />
          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.nav_item} ${isActive ? styles.active : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.nav_item} ${isActive ? styles.active : ''}`
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.nav_item} ${isActive ? styles.active : ''}`
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.nav_item} ${isActive ? styles.active : ''}`
              }
            >
              Accessories
            </NavLink>
          </nav>
        </div>
        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.icon} ${styles.iconLike}  ${isActive ? styles.activeIcon : ''}`
            }
          >
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            state={{ pathname }}
            className={({ isActive }) =>
              `${styles.icon} ${styles.iconShop}  ${isActive ? styles.activeIcon : ''}`
            }
          >
            {cart.length > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </NavLink>

          <div className={styles.containerBurger}>
            <div
              className={`${styles.icon} ${styles.iconBurger}`}
              onClick={() => setIsMenuOpen(true)}
            />
          </div>
        </div>
      </div>
      <aside className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.menu__top}>
          <Link
            to="/"
            className={styles.logo}
            onClick={() => setIsMenuOpen(false)}
          />
          <div className={styles.containerClose}>
            <div
              className={`${styles.icon} ${styles.iconClose}`}
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
        </div>
        <div className={styles.menu__hero}>
          <ul className={styles.menu__list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={({ isActive }) => (isActive ? styles.active : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.menu__bottom}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${styles.icon} ${styles.iconLike} ${styles.icon_aside} ${styles['icon_aside-border']} ${isActive ? styles.activeIcon : ''}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            state={{ pathname }}
            className={({ isActive }) =>
              `${styles.icon} ${styles.iconShop} ${styles.icon_aside} ${isActive ? styles.activeIcon : ''}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            {cart.length > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </NavLink>
        </div>
      </aside>
    </header>
  );
};

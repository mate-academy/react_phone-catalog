import styles from './Navbar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Logo from '/img/Logo.svg';
import CartIcon from '/img/icons/cart.svg';
import HeartIcon from '/img/icons/heart.svg';
import { useCart } from '@/modules/CartFavContext/CartContext';
export const Navbar = () => {
  const links = [
    { path: '/', label: 'HOME' },
    { path: '/phones', label: 'PHONES' },
    { path: '/tablets', label: 'TABLETS' },
    { path: '/accessories', label: 'ACCESSORIES' },
  ];

  const { totalCount, totalFavoritesCount } = useCart();

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.navbar__logo}>
          <img src={Logo} alt="MyShop Logo" />
        </div>

        <ul className={styles.navbar__list}>
          {links.map(({ path, label }) => (
            <li key={path} className={styles.navbar__item}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navbar__link} ${styles['navbar__link--active']}`
                    : styles.navbar__link
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.navbar__icons}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__icon} ${styles['navbar__icon--active']}`
                : styles.navbar__icon
            }
          >
            <div className={styles.navbar__iconImage}>
              <img src={HeartIcon} alt="Favorites" />
              {totalFavoritesCount > 0 && (
                <div className={styles.navbar__iconCount}>
                  {totalFavoritesCount}
                </div>
              )}
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__icon} ${styles['navbar__icon--active']}`
                : styles.navbar__icon
            }
          >
            <div className={styles.navbar__iconImage}>
              <img src={CartIcon} alt="Cart" />
              {totalCount > 0 && (
                <div className={styles.navbar__iconCount}>{totalCount}</div>
              )}
            </div>
          </NavLink>
        </div>
      </nav>{' '}
    </header>
  );
};

// export default Navbar;

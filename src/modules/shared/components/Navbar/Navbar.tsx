import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import Logo from '/img/Logo.svg';
import CartIcon from '/img/icons/cart.svg';
import HeartIcon from '/img/icons/heart.svg';
export const Navbar = () => {
  const links = [
    { path: '/', label: 'HOME' },
    { path: '/phones', label: 'PHONES' },
    { path: '/tablets', label: 'TABLETS' },
    { path: '/accessories', label: 'ACCESSORIES' },
  ];

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
          <div className={styles.navbar__icon}>
            <img src={HeartIcon} alt="Favorites" />
          </div>
          <div className={styles.navbar__icon}>
            <img src={CartIcon} alt="Cart" />
          </div>
        </div>
      </nav>{' '}
    </header>
  );
};

// export default Navbar;

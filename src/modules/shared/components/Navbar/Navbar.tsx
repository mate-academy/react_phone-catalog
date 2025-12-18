import styles from './Navbar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Logo from '/img/Logo.svg';
import CartIcon from '/img/icons/cart.svg';
import HeartIcon from '/img/icons/heart.svg';
import burgerMenu from '/img/icons/burger-menu.svg';
import { useCart } from '@/modules/CartFavContext/CartContext';
import { useEffect, useState } from 'react';
import { links } from '../../../shared/components/utils/constants/constants';
import Menu from '../Menu/Menu';
export const Navbar = () => {
  const { totalCount, totalFavoritesCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    if (isMenuOpen) {
      // Блокуємо скрол
      document.body.style.overflow = 'hidden';
    } else {
      // Відновлюємо скрол (повертаємо дефолтне значення)
      document.body.style.overflow = '';
    }

    // Функція очищення (cleanup), якщо компонент Navbar видалиться
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.navbar__logo}>
            <img src={Logo} alt="MyShop Logo" />
          </Link>
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
          <div className={styles.navbar__burgerMenu} onClick={handleMenuClick}>
            <img src={burgerMenu} alt="Menu" />
          </div>
        </nav>
      </header>
      <Menu onClose={handleMenuClose} isMenuOpen={isMenuOpen} />
    </>
  );
};

// export default Navbar;

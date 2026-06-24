import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '@/app/providers/ThemeContext';
import { links } from '@/shared/constants/links';
import Menu from '../../ui/Menu/Menu';
import ThemeToggle from './ThemeIcon';
import styles from './Navbar.module.scss';
import LogoDark from '/img/LogoDark.svg';
import LogoLight from '/img/LogoLight.svg';
import { useSelector } from 'react-redux';
import { selectCartTotalCount } from '@/store/slices/cartSlice';
import { selectFavoritesCount } from '@/store/slices/favoritesSlice';
import { IconBurger } from '@/shared/ui/Icons/IconBurger';
import { IconCart } from '@/shared/ui/Icons/IconCart';
import { IconHeartFilled } from '@/shared/ui/Icons/IconHeartFilled';

export const Navbar = () => {
  const totalCount = useSelector(selectCartTotalCount);
  const totalFavoritesCount = useSelector(selectFavoritesCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { theme } = useTheme();
  const handleMenuClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link
            to="/"
            className={styles.navbar__logo}
            onClick={() => window.scrollTo({ top: 0 })}
          >
            <img
              src={theme === 'dark' ? LogoDark : LogoLight}
              alt="MyShop Logo"
            />
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
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.navbar__icons}>
            <ThemeToggle />
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__icon} ${styles['navbar__icon--active']}`
                  : styles.navbar__icon
              }
            >
              <div className={styles['navbar__iconImage--container']}>
                <IconHeartFilled className={styles.navbar__iconImage} />

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
              <div className={styles['navbar__iconImage--container']}>
                <IconCart className={styles.navbar__iconImage} />

                {totalCount > 0 && (
                  <div className={styles.navbar__iconCount}>{totalCount}</div>
                )}
              </div>
            </NavLink>
          </div>
          <div className={styles.navbar__burgerMenu} onClick={handleMenuClick}>
            <IconBurger />
          </div>
        </nav>
      </header>
      <Menu onClose={handleMenuClose} isMenuOpen={isMenuOpen} />
    </>
  );
};

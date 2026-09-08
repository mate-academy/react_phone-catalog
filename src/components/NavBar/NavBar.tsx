import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useEffect, useState } from 'react';
import { useProducts } from '../../context/ProductsContext';
import { useWindowWidth } from '../../utils/helpers';
import { useTranslation } from 'react-i18next';

export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const { cart, favorites } = useProducts();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const width = useWindowWidth();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.amount, 0);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'light',
  );

  useEffect(() => {
    document.body.classList.remove('dark', 'light');

    document.body.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLangChange = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('uk');
    } else {
      i18n.changeLanguage('en');
    }
  };

  useEffect(() => {
    if (width >= 640) {
      setIsOpenMenu(false);
    }
  }, [width]);

  useEffect(() => {
    document.body.style.overflow = isOpenMenu ? 'hidden' : 'auto';
  }, [isOpenMenu]);

  const openMenu = () => {
    setIsOpenMenu(cur => !cur);
  };

  const handleNavigate = () => {
    setIsOpenMenu(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <nav className={!isOpenMenu ? styles.navbar : styles.navbar__opened}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__phone_header}>
          <NavLink
            to={'/'}
            className={styles.navbar__logo}
            onClick={handleNavigate}
          >
            <div className={styles.navbar__logo__img}></div>
          </NavLink>
          <div
            className={`${styles.navbar__burger_menu} ${isOpenMenu ? styles.navbar__burger_menu__opened : styles.navbar__burger_menu__closed}`}
            onClick={openMenu}
          ></div>
        </div>
        <div
          className={
            !isOpenMenu ? styles.navbar__menu : styles.navbar__menu_opened
          }
        >
          <NavLink
            to={'/'}
            onClick={handleNavigate}
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__menuItem} ${styles['navbar__menuItem--active']}`
                : styles.navbar__menuItem
            }
          >
            {t('home')}
          </NavLink>
          <NavLink
            onClick={handleNavigate}
            to={'phones'}
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__menuItem} ${styles['navbar__menuItem--active']}`
                : styles.navbar__menuItem
            }
          >
            {t('phones')}
          </NavLink>
          <NavLink
            onClick={handleNavigate}
            to={'tablets'}
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__menuItem} ${styles['navbar__menuItem--active']}`
                : styles.navbar__menuItem
            }
          >
            {t('tablets')}
          </NavLink>
          <NavLink
            onClick={handleNavigate}
            to={'accessories'}
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__menuItem} ${styles['navbar__menuItem--active']}`
                : styles.navbar__menuItem
            }
          >
            {t('accessories')}
          </NavLink>
        </div>
      </div>

      <div>
        <div>
          <div className="change-theme" onClick={toggleTheme}></div>
          <div className="change-lang" onClick={() => handleLangChange()}>
            {i18n.language === 'en' ? 'EN' : 'UK'}
          </div>
        </div>
        <div
          className={
            !isOpenMenu ? styles.navbar__actions : styles.navbar__actions_opened
          }
        >
          <NavLink
            to={'favourites'}
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__heart_icon} ${styles['navbar__heart_icon--active']}`
                : styles.navbar__heart_icon
            }
            onClick={handleNavigate}
          >
            {favorites.length > 0 && (
              <div className={styles.notification}>{favorites.length}</div>
            )}
          </NavLink>
          <NavLink
            to={'cart'}
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__shop_icon} ${styles['navbar__shop_icon--active']}`
                : styles.navbar__shop_icon
            }
            onClick={handleNavigate}
          >
            {cart.length > 0 && (
              <div className={styles.notification}>{cartItemsCount}</div>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

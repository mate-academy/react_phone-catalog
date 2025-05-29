import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useEffect, useState } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

export const NavBar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const width = useWindowWidth();

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
            <img
              className={styles.navbar__logo__img}
              src="../public/img/navigation/logo.svg"
              alt="logo"
            />
          </NavLink>
          <div className={styles.navbar__burger_menu}>
            <div
              onClick={openMenu}
              className={
                isOpenMenu
                  ? styles.navbar__burger_menu__close
                  : styles.navbar__burger_menu__open
              }
            ></div>
          </div>
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
            Home
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
            Phones
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
            Tablets
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
            Accessories
          </NavLink>
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
        ></NavLink>
        <NavLink
          to={'wishlist'}
          className={({ isActive }) =>
            isActive
              ? `${styles.navbar__shop_icon} ${styles['navbar__shop_icon--active']}`
              : styles.navbar__shop_icon
          }
          onClick={handleNavigate}
        ></NavLink>
      </div>
    </nav>
  );
};

import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useEffect, useState } from 'react';
import { useProducts } from '../../context/ProductsContext';
import { useWindowWidth } from '../../utils/helpers';

export const NavBar = () => {
  const { cart, favorites } = useProducts();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const width = useWindowWidth();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.amount, 0);

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
    </nav>
  );
};

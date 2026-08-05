// .. Header.tsx
import { useState, useEffect } from 'react';
import { MobileMenu } from '../MobileMenu';
import styles from './Header.module.scss';
import { NavLink, Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { useCart } from '../context/CartContext';

import favouriteIcon from '/icons/icon-favourites.svg';
import shoppingBagIcon from '/icons/icon-shopping-bag.svg';
import logo from '/icons/logo.svg';
import burger from '/icons/burger.svg';
import close from '/icons/close.svg';

export const Header = () => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  // 2. Витягуємо favouritesCount з контексту
  const { favouritesCount } = useFavourites();
  const { cartCount } = useCart();

  const handleMenu = () => {
    setIsVisibleMenu(prev => !prev);
  };

  const closeBurgerMenu = () => {
    setIsVisibleMenu(false);
  };

  useEffect(() => {
    if (isVisibleMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisibleMenu]);

  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="Nice gadgets" className={styles.logoImage} />
          </Link>
        </div>
        <nav className={styles.navbar}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
                to="/"
              >
                home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
                to="/phones"
              >
                Phones
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
                to="/tablets"
              >
                tablets
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive}` : styles.link
                }
                to="/accessories"
              >
                accessories
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.action}>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive
                ? `${styles.favourites} ${styles.linkActive}`
                : styles.favourites
            }
          >
            <div className={styles.wraperIcons}>
              <img
                src={favouriteIcon}
                alt="favourites"
                className={styles.icons}
              />
              <span className={styles.badge}>{favouritesCount}</span>
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${styles.bag} ${styles.linkActive}` : styles.bag
            }
          >
            <div className={styles.wraperIcons}>
              <img
                src={shoppingBagIcon}
                alt="icon-shopping-bag"
                className={styles.icons}
              />
              <span className={styles.badge}>{cartCount || 0}</span>
            </div>
          </NavLink>
        </div>

        {isVisibleMenu ? (
          <button type="button" className={styles.burger} onClick={handleMenu}>
            <img src={close} alt="icon-close" className={styles.icons} />
          </button>
        ) : (
          <button type="button" className={styles.burger} onClick={handleMenu}>
            <img src={burger} alt="icon-burger" className={styles.icons} />
          </button>
        )}
      </div>
      {isVisibleMenu && <MobileMenu onClose={closeBurgerMenu} />}
    </header>
  );
};

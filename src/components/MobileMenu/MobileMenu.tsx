import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MobileMenu.module.scss';
import favoritesIconSrc from '../../img/icons/FavoritesIcon.svg';
import { useAppContext } from '../../context/AppContext';
/* import favoritesIconSrcDT from '../../img/icons/FavoritesIcon--DarkTheme.svg'; */
import cartIconSrc from '../../img/icons/CartIcon.svg';
/* import cartIconSrcDT from '../../img/icons/CartIcon--DarkTheme.svg'; */

export const MobileMenu: React.FC = () => {
  const { isMobMenuOpen } = useAppContext();

  useEffect(() => {
    console.log(isMobMenuOpen)
  }, [isMobMenuOpen])
  return (
    <div className={styles.topWrapper}>
  <div className={styles.menuOverlay}
      /* className={classNames(styles.menuOverlay, {
        [styles.show]: isMenuOpen,
      })} */
      /* aria-expanded={isMenuOpen} */
    >
      <nav className={styles.nav} role="navigation">
        <NavLink
          to="/"
          /* onClick={toggleIsMenuOpen} */
/*           className={({ isActive }) =>
            classNames(styles.item, { [styles.isActive]: isActive })
          } */
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          /* onClick={toggleIsMenuOpen} */
         /*  className={({ isActive }) =>
            classNames(styles.item, { [styles.isActive]: isActive })
          } */
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          /* onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.item, { [styles.isActive]: isActive })
          } */
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          /* onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.item, { [styles.isActive]: isActive })
          } */
        >
          Accessories
        </NavLink>
      </nav>
      <div className={styles.actions}>
        <NavLink
          to="/favorites"
          /* onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.action, { [styles.isActive]: isActive })
          } */
        >
          <div className={styles.actionIcon}>
            <img src={favoritesIconSrc} alt="Favorites" />
            {/* {favorites.length > 0 && (
              <span className={styles.count}>
                <p className={styles.countText}>{favorites.length}</p>
              </span>
            )} */}
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          /* onClick={toggleIsMenuOpen}
          className={({ isActive }) =>
            classNames(styles.action, { [styles.isActive]: isActive })
          } */
        >
          <div className={styles.actionIcon}>
            <img src={cartIconSrc} alt="Cart" className={styles.icon} />
           {/*  {cart.length > 0 && (
              <span className={styles.count}>
                <p className={styles.countText}>{cart.length}</p>
              </span>
            )} */}
          </div>
        </NavLink>
      </div>
    </div>

    </div>

  );
};

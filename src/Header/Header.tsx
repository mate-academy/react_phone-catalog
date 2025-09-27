import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__leftBlock}>
          <NavLink className={styles.header__niceGadgetsLogo} to="/"></NavLink>
          <ul className={styles.header__Navleft}>
            <li>
              <NavLink
                to="/Home"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.text__uppercase} active`
                    : styles.text__uppercase
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/phones"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.text__uppercase} active`
                    : styles.text__uppercase
                }
              >
                Phones
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tablets"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.text__uppercase} active`
                    : styles.text__uppercase
                }
              >
                Tablets
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/accessories"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.text__uppercase} active`
                    : styles.text__uppercase
                }
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.header__rightBlock}>
          <ul className={styles.header__Navright}>
            <li>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__Favourites} active`
                    : styles.header__Favourites
                }
              />
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.header__Shopping} active`
                    : styles.header__Shopping
                }
              />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

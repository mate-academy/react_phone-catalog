import { Link, NavLink, useLocation } from 'react-router-dom';
import styles from './AsideMenu.module.scss';

export const AsideMenu = () => {
  const isMenuClicked = useLocation().pathname.slice(1);

  return (
    <aside
      className={`${styles.menu} ${isMenuClicked ? styles.menu_open : ''}`}
    >
      <nav className={styles.menu_buttons}>
        <ul>
          <li>
            <NavLink to="/home" className={styles.menu_buttons_buttons}>
              home
            </NavLink>
          </li>
          <li>
            <NavLink to="/phones" className={styles.menu_buttons_buttons}>
              phones
            </NavLink>
          </li>
          <li>
            <NavLink to="/tablets" className={styles.menu_buttons_buttons}>
              tablets
            </NavLink>
          </li>
          <li>
            <NavLink to="/accessories" className={styles.menu_buttons_buttons}>
              accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.menu_icons}>
        <div className={styles.menu_icons_icon}>
          <Link to={'../favourites'}>
            <img src="img/icons/favourites.svg" alt="" />
          </Link>
        </div>
        <div className={styles.menu_icons_line}></div>
        <div className={styles.menu_icons_icon}>
          <Link to={'../bucket'}>
            <img src="img/icons/shopping-bag.svg" alt="" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

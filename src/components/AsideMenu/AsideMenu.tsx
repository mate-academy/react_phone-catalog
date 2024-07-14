import { NavLink } from 'react-router-dom';
import { NAV_ROUTES } from '../../constants/constants';
import { getNavigationRoute } from '../../utils';

import cn from 'classnames';
import { cartIcon, favoriteIcon } from '../../assets';

import styles from './AsideMenu.module.scss';

type Props = {
  onCloseMenu: () => void;
};

export const AsideMenu: React.FC<Props> = ({ onCloseMenu }) => {
  return (
    <aside className={styles.AsideMenu}>
      <div className={styles.AsideMenuContent}>
        <nav className={styles.AsideNavigation}>
          <ul className={styles.AsideList}>
            {NAV_ROUTES.map(route => (
              <li key={route} className={styles.AsideItem}>
                <NavLink
                  className={({ isActive }) =>
                    cn(styles.AsideLink, {
                      [styles.ActiveLink]: isActive,
                    })
                  }
                  onClick={onCloseMenu}
                  to={getNavigationRoute(route)}
                >
                  {route}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div onClick={onCloseMenu} className={styles.AsideTabs}>
        <NavLink
          className={({ isActive }) =>
            cn(styles.AsideTabsItem, {
              [styles.ActiveTab]: isActive,
            })
          }
          to="/favorites"
        >
          <img src={favoriteIcon} alt="favourite" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(styles.AsideTabsItem, {
              [styles.ActiveTab]: isActive,
            })
          }
          to="/cart"
        >
          <img src={cartIcon} alt="cart" />
        </NavLink>
      </div>
    </aside>
  );
};

import { NavLink } from 'react-router-dom';
import { NAV_ROUTES } from '../../constants/constants';
import { getNavigationRoute } from '../../utils';

import cn from 'classnames';
import { cartIcon, favoriteIcon } from '../../assets';

import styles from './AsideMenu.module.scss';

type Props = {
  onCloseMenu: () => void;
  active: boolean;
};

export const AsideMenu: React.FC<Props> = ({ onCloseMenu, active }) => {
  return (
    <aside
      className={cn(styles.aside, {
        [styles.active]: active,
      })}
    >
      <div className={styles.content}>
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            {NAV_ROUTES.map(route => (
              <li key={route} className={styles.item}>
                <NavLink
                  className={({ isActive }) =>
                    cn(styles.link, {
                      [styles['link--active']]: isActive,
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
      <div onClick={onCloseMenu} className={styles.tabs}>
        <NavLink
          className={({ isActive }) =>
            cn(styles.tab, {
              [styles['tab--active']]: isActive,
            })
          }
          to="/favorites"
        >
          <img src={favoriteIcon} alt="favourite" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            cn(styles.tab, {
              [styles['tab--active']]: isActive,
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

import { NavLink } from 'react-router-dom';
import styles from './asideMenuPhone.module.scss';
import classNames from 'classnames';
import { IconsSvg } from '../icons/icons';
import { NavBar } from '../navBar';
import { FaRegHeart } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
export const AsideMenuPhone = ({ setActiveAsside,getLinkClass }) => {

  return (
    <aside className={styles.menu} id="menu" onClick={() => setActiveAsside(false)}>

      <NavBar getLinkClass={getLinkClass} types={ 'asideMenu'} />

      <div
        className={styles.menu__bottom}
        onClick={() => setActiveAsside(false)}
      >
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            classNames(styles.buttonWrapper, {
              [styles['is-active']]: isActive,
            })
          }
        >
          <FaRegHeart className={styles['visible--mobile']} />
        </NavLink>

        <div className={styles.divider}></div>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.buttonWrapper, {
              [styles['is-active']]: isActive,
            })
          }
        >
          <FiShoppingBag className={styles['visible--mobile']} />
        </NavLink>
      </div>
    </aside>
  );
};

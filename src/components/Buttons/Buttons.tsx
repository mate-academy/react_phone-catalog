import { NavLink } from 'react-router-dom';
import styles from './Buttons.module.scss';
import favourites from '../../media/icon/favourites.svg';
import cart from '../../media/icon/cart.svg';
import menu from '../../media/icon/menu.svg';
import { getActiveLink } from '../../utils/getActiveLink';

export const Buttons = () => {
  return (
    <ul className={styles.buttons}>
      <li className={`${styles.button} ${styles['button--desktop']}`}>
        <NavLink
          to="favourites"
          className={({ isActive }) =>
            getActiveLink({ isActive, element: 'button__link', styles })
          }
        >
          <img
            src={favourites}
            alt="favourites icon"
            className={styles.button__icon}
          />
        </NavLink>
      </li>

      <li className={`${styles.button} ${styles['button--desktop']}`}>
        <NavLink
          to="cart"
          className={({ isActive }) =>
            getActiveLink({ isActive, element: 'button__link', styles })
          }
        >
          <img src={cart} alt="cart icon" className={styles.button__icon} />
        </NavLink>
      </li>

      <li className={`${styles.button} ${styles['button--mobile']}`}>
        <NavLink
          to="menu"
          className={({ isActive }) =>
            getActiveLink({ isActive, element: 'button__link', styles })
          }
        >
          <img src={menu} alt="menu icon" className={styles.button__icon} />
        </NavLink>
      </li>
    </ul>
  );
};

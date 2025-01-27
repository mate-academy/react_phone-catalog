import { NavLink } from 'react-router-dom';
import styles from './Buttons.module.scss';
import favourites from '../../media/icon/favourites.svg';
import cart from '../../media/icon/cart.svg';

export const Buttons = () => {
  return (
    <ul className={styles.buttons}>
      <li className={styles.button}>
        <NavLink to="favourites" className={styles.button_link}>
          <img
            src={favourites}
            alt="favourites icon"
            className={styles.button_icon}
          />
        </NavLink>
      </li>
      <li className={styles.button}>
        <NavLink to="cart" className={styles.button_link}>
          <img src={cart} alt="cart icon" className={styles.button_icon} />
        </NavLink>
      </li>
    </ul>
  );
};

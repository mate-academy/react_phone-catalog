import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './ListOfIconLinks.module.scss';

// type Icons = 'favourites' | 'cart' | 'burgerMenu';

function getLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('link', styles.iconLink, {
    [styles.iconLinkActive]: isActive,
  });
}

export const ListOfIconLinks = () => {
  return (
    <ul className={styles.iconList}>
      <li className={styles.navItem}>
        <NavLink to={'/favourites'} className={getLinkClass}>
          <img
            className="icons"
            src="img/icons/favourites.svg"
            alt="favourites icon"
          />
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to={'/cart'} className={getLinkClass}>
          <img className="icons" src="img/icons/cart.svg" alt="cart icon" />
        </NavLink>
      </li>
    </ul>
  );
};

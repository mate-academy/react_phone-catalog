import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './ListOfIconLinks.module.scss';
import React from 'react';

// type Icons = 'favourites' | 'cart' | 'burgerMenu';

function getLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('link', styles.iconLink, {
    [styles.iconLinkActive]: isActive,
  });
}

type Props = {
  parentComponent: 'header' | 'saidebar';
};

export const ListOfIconLinks: React.FC<Props> = ({ parentComponent }) => {
  return (
    <ul
      className={classNames({
        [styles.headerList]: parentComponent === 'header',
        [styles.saidebarList]: parentComponent === 'saidebar',
      })}
    >
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

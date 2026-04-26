import React from 'react';
import styles from './Menu.module.scss';
import heart from '../../images/Icons/Heart.png';
import cart from '../../images/Icons/Cart.png';
import { Navbar } from '../Header/Navbar';
import { NavLink } from 'react-router-dom';
import { getClassLink } from '../../utils/getClassLink';

type Props = {
  onMenuClose: (close: boolean) => void | undefined;
};

export const Menu: React.FC<Props> = ({ onMenuClose }) => {
  const getLinkClass = getClassLink({
    baseClass: styles.menu__iconLink,
    activeClass: styles.activeLink,
  });

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__navBar}>
        <Navbar onMenuClose={onMenuClose} />
      </div>

      <div className={styles.menu__icons}>
        <div className={styles.menu__iconBlock}>
          <NavLink
            onClick={() => onMenuClose(false)}
            className={getLinkClass}
            to="/favorites"
          >
            <img className={styles.menu__heartImg} src={heart} />
          </NavLink>
        </div>
        <div className={styles.menu__iconBlock}>
          <NavLink
            onClick={() => onMenuClose(false)}
            className={getLinkClass}
            to="/cart"
          >
            <img className={styles.menu__cartImg} src={cart} />
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

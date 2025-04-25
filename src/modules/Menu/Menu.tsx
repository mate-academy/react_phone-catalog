import React from 'react';
import Logo from '../Logo';
import SharedStyles from '../shared/shared-styles.module.scss';
import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  setMenuActive: (value: boolean) => void;
};

export const Menu: React.FC<Props> = ({ setMenuActive }) => {
  function handleMenuClose() {
    setMenuActive(false);
  }

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__top}>
        <Logo />
        <div className={SharedStyles.iconWrap}>
          <img
            src="public/img/icons/Close.svg"
            alt="Close Icon"
            onClick={handleMenuClose}
          />
        </div>
      </div>
      <ul className={styles.menu__nav}>
        <li className={`${styles.menu__link}`}>
          <Link to="/" className="uppercase" onClick={handleMenuClose}>
            Home
          </Link>
        </li>
        <li className={styles.menu__link}>
          <Link to="/phones" className="uppercase" onClick={handleMenuClose}>
            Phones
          </Link>
        </li>
        <li className={styles.menu__link}>
          <Link to="/tablets" className="uppercase" onClick={handleMenuClose}>
            Tablets
          </Link>
        </li>
        <li className={styles.menu__link}>
          <Link
            to="/accessories"
            className="uppercase"
            onClick={handleMenuClose}
          >
            Accessories
          </Link>
        </li>
      </ul>
      <div className={styles.icons}>
        <Link
          to="/favorites"
          className={styles.iconWrap}
          onClick={handleMenuClose}
        >
          <img src="public/img/icons/heart.svg" alt="Heart Icon" />
        </Link>
        <Link to="/cart" className={styles.iconWrap} onClick={handleMenuClose}>
          <img src="public/img/icons/bag.svg" alt="Bag Icon" />
        </Link>
      </div>
    </aside>
  );
};

export default Menu;

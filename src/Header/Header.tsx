import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import '../../public/img/Logo.png';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="../../public/img/Logo.png" alt="Logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navLeft}>
          <li>
            <Link to="/phones">Phones</Link>
          </li>
          <li>
            <Link to="/tablets">Tablets</Link>
          </li>
          <li>
            <Link to="/accessories">Accessories</Link>
          </li>
        </ul>
        <ul className={styles.navRight}>
          <li>
            <Link to="/Favorites">
              <img src="../../public/img/Favourites.png" alt="Favorites" />
            </Link>
          </li>
          <li>
            <Link to="/Cart">
              <img src="../../public/img/shopping-bag.png" alt="Cart" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

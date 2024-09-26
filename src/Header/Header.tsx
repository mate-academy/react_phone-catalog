import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import '../../public/img/Logo.png';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="img/Logo.svg" alt="Logo" />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.nav_left}>
          <li>
            <Link to="/">Home</Link>
          </li>
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
        <ul className={styles.nav_right}>
          <li>
            <Link to="/Favorites">
              <img src="img/Favourites.svg" alt="Favorites" />
            </Link>
          </li>
          <li>
            <Link to="/Cart">
              <img src="img/shopping-bag.svg" alt="Cart" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

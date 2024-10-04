import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import '../../public/img/Logo.png';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" onClick={toggleMenu}>
          <img src="img/Logo.svg" alt="Logo" />
        </Link>
      </div>

      <button className={styles.header_burger_bnt} onClick={toggleMenu}>
        <img src="img/burger-menu.png" alt="Burger Menu" />
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.nav_open : ''}`}>
        <ul className={styles.nav_left}>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/phones" onClick={toggleMenu}>
              Phones
            </Link>
          </li>
          <li>
            <Link to="/tablets" onClick={toggleMenu}>
              Tablets
            </Link>
          </li>
          <li>
            <Link to="/accessories" onClick={toggleMenu}>
              Accessories
            </Link>
          </li>
        </ul>

        <div className={styles.nav_bottom}>
          <Link to="/Favorites" onClick={toggleMenu}>
            <img src="img/Favourites.svg" alt="Favorites" />
          </Link>
          <Link to="/Cart" onClick={toggleMenu}>
            <img src="img/shopping-bag.svg" alt="Cart" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

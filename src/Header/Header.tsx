import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('body_no_scroll');
    } else {
      document.body.classList.remove('body_no_scroll');
    }
  });

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="img/Logo.svg" alt="Logo" className={styles.logo_img} />
          </Link>
        </div>

        <div className={styles.burger} onClick={toggleMenu}>
          {menuOpen ? (
            <img
              src="img/close.png"
              alt="Burger close"
              className={styles.burger_img}
            />
          ) : (
            <img
              src="img/burger-menu.png"
              alt="Burger menu"
              className={styles.burger_img}
            />
          )}
        </div>

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

          <div className={styles.nav_right}>
            <Link
              to="/Favorites"
              onClick={toggleMenu}
              className={styles.nav_favorite}
            >
              <img
                src="img/Favourites.svg"
                alt="Favorites"
                className={styles.nav_img}
              />
            </Link>
            <Link to="/Cart" onClick={toggleMenu} className={styles.nav_cart}>
              <img
                src="img/shopping-bag.svg"
                alt="Cart"
                className={styles.nav_img}
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

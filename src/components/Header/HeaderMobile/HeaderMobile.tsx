import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderMobile.module.scss';
import logoImg from '../../../../public/icons/Logo.svg';
import menuIcon from '../../../../public/icons/Menu.svg';
import closeIcon from '../../../../public/icons/Close.svg';
import heartIcon from '../../../../public/icons/Favourites-(Heart-Like).svg';
import bagIcon from '../../../../public/icons/Shopping-bag-(Cart).svg';

export function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoImg} alt="Nice Gadgets" className={styles.logo} />
        </Link>

        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <img
            src={isOpen ? closeIcon : menuIcon}
            alt={isOpen ? 'Close' : 'Menu'}
            className={styles.menuIcon}
          />
        </button>
      </div>

      <aside className={`${styles.menuPanel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.topBar}>
          <Link to="/" className={styles.logoLink}>
            <img src={logoImg} alt="Nice Gadgets" className={styles.logo} />
          </Link>

          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <img
              src={isOpen ? closeIcon : menuIcon}
              alt={isOpen ? 'Close' : 'Menu'}
              className={styles.menuIcon}
            />
          </button>
        </div>
        <nav className={styles.nav}>
          <Link to="/" onClick={toggleMenu} className={styles.active}>
            Home
          </Link>
          <Link to="/phones" onClick={toggleMenu}>
            Phones
          </Link>
          <Link to="/tablets" onClick={toggleMenu}>
            Tablets
          </Link>
          <Link to="/accessories" onClick={toggleMenu}>
            Accessories
          </Link>
        </nav>

        <div className={styles.bottomBar}>
          <Link
            to="/favorites"
            className={styles.iconButton}
            onClick={toggleMenu}
          >
            <img src={heartIcon} alt="Favorites" />
          </Link>
          <Link to="/cart" className={styles.iconButton} onClick={toggleMenu}>
            <img src={bagIcon} alt="Cart" />
          </Link>
        </div>
      </aside>
    </header>
  );
}

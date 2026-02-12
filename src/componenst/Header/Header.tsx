import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={`container ${styles.header__inner}`}>
      <Link to="/" className={styles.header__logo}>
        Gadget Catalog
      </Link>
      <nav className={styles.header__nav}>
        <Link to="/">Home</Link>
      </nav>
    </div>
  </header>
);

export default Header;

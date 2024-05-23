import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles}>
        <img src="" alt="" />
      </Link>
      <h1 className={styles.title}>Hello</h1>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../icons/Logo.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="" />
      </Link>
      <h1 className={styles.title}>Hello</h1>
    </header>
  );
};

export default Header;

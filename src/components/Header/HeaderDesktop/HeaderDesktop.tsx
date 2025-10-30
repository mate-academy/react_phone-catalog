import React from 'react';
import styles from './HeaderDesktop.module.scss';
import { Link } from 'react-router-dom';
import logoImg from '../../../../public/icons/Logo.svg';

export function HeaderDesktop() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logo} src={logoImg} alt="logo" />
      </Link>
      <nav className={styles.nav}>
        <Link to="/">Home</Link>
        <Link to="/phones">Phones</Link>
        <Link to="/tablets">Tablets</Link>
        <Link to="/accessories">Accessories</Link>
      </nav>
      <div className={styles.icons}>
        <Link to="/favorites" className={styles.favorites}></Link>
        <Link to="/cart" className={styles.cart}></Link>
      </div>
    </header>
  );
}

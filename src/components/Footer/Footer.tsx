import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/img/logo.svg`;
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <Link to="/">
        <img src={logoUrl} alt="logo" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="https://github.com/Klimukalina" className={styles.navLink}>
              Github
            </Link>
          </li>
          <li className={styles.navItem}>
            <a href="mailto:klimukalina4@gmail.com" className={styles.navLink}>
              Contacts
            </a>
          </li>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Rights
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.goToBackBlock}>
        <p onClick={handleScroll} className={styles.goToBack}>
          Back to top
        </p>
        <button className={styles.goToBackButton} onClick={handleScroll}></button>
      </div>
    </footer>
  );
};

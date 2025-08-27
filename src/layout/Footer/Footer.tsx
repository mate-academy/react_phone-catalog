import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../../../public/img/logo.svg';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <img src={Logo} alt="Nice Gadgets logo" />
        </Link>

        <nav className={styles.nav}>
          <Link to="/">Github</Link>
          <Link to="/">Contacts</Link>
          <Link to="/">Rights</Link>
        </nav>

        <div className={styles.backToTop} onClick={scrollToTop}>
          Back to top
        </div>
      </div>
    </footer>
  );
};

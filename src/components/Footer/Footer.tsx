import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <Link to="/">
          <div className={styles.logo}>LOGO</div>
        </Link>
        <nav className={styles.nav}>
          <a
            href="https://github.com/Knysh19"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <Link to="/Contacts">Contacts</Link>
          <Link to="/Rights">Rights</Link>
        </nav>
        <div className={styles.backToTop}>
          <span className={styles.totop}>Back to top</span>
          <button
            className={styles.toTopBtn}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          ></button>
        </div>
      </div>
    </footer>
  );
}

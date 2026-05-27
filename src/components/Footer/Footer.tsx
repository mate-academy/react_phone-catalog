import React from 'react';

import styles from './Footer.module.scss';

import Up from '../../api/buttoms/up.png';

import logo from '../../api/img/Logo.png';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <img src={logo} alt="Nice Gadgets" className={styles.logo} />
        </div>

        <nav className={styles.nav}>
          <a
            href="https://github.com/Paha12344321"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/pavlo-balanenko-589820346/"
            target="_blank"
            rel="noreferrer"
          >
            CONTACTS
          </a>
          <a
            href="https://www.apple.com/legal/privacy/"
            target="_blank"
            rel="noreferrer"
          >
            RIGHTS
          </a>
        </nav>

        <div className={styles.backToTop}>
          <span>Back to top</span>
          <button onClick={scrollToTop} className={styles.arrowBtn}>
            <img src={Up} alt="up" />
          </button>
        </div>
      </div>
    </footer>
  );
};

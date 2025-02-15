import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img
          className={styles.logo__img}
          src="/img/icons/Logo.svg"
          alt="Logo"
        />
      </div>

      <div className={styles.footer__links}>
        <a href="#" className={styles.footer__link}>
          git hub
        </a>
        <a href="#" className={styles.footer__link}>
          rights
        </a>
        <a href="#" className={styles.footer__link}>
          contacts
        </a>
      </div>

      <div className={styles.toTop}>
        <p className={styles.toTop__title}>Back to top</p>
        <div className={styles.toTop__button}>
          <a href="#home" className={styles.toTop__link} />
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoBlock}>
          <Link to="/" className={styles.logo} />
        </div>

        <ul className={styles.links}>
          <li>
            <a href="https://github.com">GITHUB</a>
          </li>
          <li>
            <a href="/contacts">CONTACTS</a>
          </li>
          <li>
            <a href="/rights">RIGHTS</a>
          </li>
        </ul>

        <div className={styles.toTop}>
          <a href="#top">
            Back to top <div className="img"></div>
          </a>
        </div>
      </div>
    </footer>
  );
};

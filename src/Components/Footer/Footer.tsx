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
            <a
              href="https://github.com/BogdanS1nb"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </a>
          </li>
          <li>
            <a
              href="https://github.com/BogdanS1nb"
              target="_blank"
              rel="noopener noreferrer"
            >
              CONTACTS
            </a>
          </li>
          <li>
            <a
              href="https://github.com/BogdanS1nb"
              target="_blank"
              rel="noopener noreferrer"
            >
              RIGHTS
            </a>
          </li>
        </ul>

        <div className={styles.toTop}>
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.back}
          >
            Back to top<div className={styles.img}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

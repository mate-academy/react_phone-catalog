import styles from './Footer.module.scss';

import icon from './../img/icons/Logo.svg';
import arrowTop from './../img/icons/Chevron Arrow top.svg';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img src={icon} alt="" className={styles.logo} />
        <nav className={styles.nav}>
          <a
            href="https://github.com/Kovtun-Dmytro"
            target="_blank"
            className={styles.link}
            rel="noreferrer"
          >
            Github
          </a>
          <Link to="/contacts" className={styles.link}>
            Contacts
          </Link>
          <Link to="/rights" className={styles.link}>
            Rights
          </Link>
        </nav>
        <div
          className={styles.scroll}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          <p className={styles.backText}>Back to top</p>
          <button className={styles.scrollButton} aria-label="Scroll to top">
            <img src={arrowTop} alt="" className={styles.icon} />
          </button>
        </div>
      </div>
    </footer>
  );
};

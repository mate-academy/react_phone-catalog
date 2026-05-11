import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="#" className={styles.logoLink}>
          <img src="img/logo.svg" alt="Logo" className={styles.logo} />
        </a>

        <a
          href="https://github.com/adadiada"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          GITHUB
        </a>

        <NavLink to="/contacts" className={styles.contact}>
          CONTACTS
        </NavLink>

        <NavLink to="/rights" className={styles.rights}>
          RIGHTS
        </NavLink>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.topBtn}
          aria-label="Back to top"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};

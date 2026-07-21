import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <NavLink to="/" className={styles.logo}>
        <img src="/img/logo.png" alt="Nice Gadgets" />
      </NavLink>

      <div className={styles.links}>
        <a
          href="https://github.com/droopy-bit/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a href="#" className={styles.link}>
          Contacts
        </a>
        <a href="#" className={styles.link}>
          Rights
        </a>
      </div>

      <button
        className={styles.back}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to Top
        <img src="/img/arrow-up.png" alt="" className={styles.backIcon} />
      </button>
    </div>
  </footer>
);

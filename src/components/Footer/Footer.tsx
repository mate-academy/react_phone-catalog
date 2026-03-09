import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.brandLink}>
          <img
            src="/img/Nice%20Gadgets.png"
            alt="Nice Gadgets"
            className={styles.brandLogo}
          />
        </Link>

        <a
          href="https://github.com/maksymivivan2000-dotcom"
          target="_blank"
          rel="noreferrer"
          className={styles.footerLink}
        >
          GitHub
        </a>

        <a href="/contacts" className={styles.footerLink}>
          Contacts
        </a>

        <a href="/contacts" className={styles.footerLink}>
          Right
        </a>

        <div className={styles.backToTop}>
          <h1
            className={styles.footerLink}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back To Up
          </h1>
          <button
            type="button"
            className={styles.top}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

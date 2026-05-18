import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Link to="/" className={styles.logo}>
          <img src="/img/logo.svg" alt="Nice Gadgets Logo" />
        </Link>

        <nav className={styles.links}>
          <a
            href="https://github.com/твоє-імя"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
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

        <div className={styles.back} onClick={scrollToTop}>
          <span className={styles.back_text}>Back to top</span>
          <button
            type="button"
            className={styles.back_btn}
            aria-label="Back to top"
          >
            <img src="/img/arrow-up.png" alt="Arrow Up" />
          </button>
        </div>
      </div>
    </footer>
  );
};

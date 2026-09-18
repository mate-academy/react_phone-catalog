import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__container}`}>
        <Link to="/" className={styles.footer__logo}>
          NICE GADGETS
        </Link>

        <nav className={styles.footer__nav}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
          >
            GITHUB
          </a>
          <Link to="#" className={styles.footer__link}>
            CONTACTS
          </Link>
          <Link to="#" className={styles.footer__link}>
            RIGHTS
          </Link>
        </nav>

        <div className={styles.footer__back}>
          <span className={styles['footer__back-text']}>Back to top</span>
          <button onClick={scrollToTop} className={styles.footer__button}>
            <i className="fas fa-chevron-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

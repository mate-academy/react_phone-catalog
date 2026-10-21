import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logo}>
          <img
            src="img/Logo.png"
            alt="Nice Gadgets"
            className={styles['footer__logo-img']}
          />
        </Link>

        <nav className={styles.footer__nav}>
          <a
            href="https://github.com/masteryada378/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
          >
            Github
          </a>
          <a
            href="https://github.com/masteryada378"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
          >
            Contacts
          </a>
          <a
            href="https://github.com/masteryada378/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className={styles.footer__link}
          >
            Rights
          </a>
        </nav>

        <div className={styles.footer__back}>
          <span className={styles['footer__back-text']}>Back to top</span>
          <button
            onClick={scrollToTop}
            className={styles.footer__button}
            aria-label="Back to top"
          >
            <i className="fas fa-chevron-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

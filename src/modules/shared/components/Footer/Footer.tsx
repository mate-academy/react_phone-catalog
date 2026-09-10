import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <Link to="/" className={styles.footer__logo}>
          <img
            src="img/icons/Logo.svg"
            alt="Nice Gadgets Logo"
            className={styles.footer__logoImg}
          />
        </Link>

        <nav className={styles.footer__nav}>
          <a
            href="https://github.com/ferenssofia/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            Github
          </a>
          <a
            href="https://github.com/ferenssofia"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            Contacts
          </a>
          <a
            href="https://github.com/ferenssofia/react_phone-catalog#readme"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            Rights
          </a>
        </nav>

        <div className={styles.footer__backToTop}>
          <span className={styles.footer__backText}>Back to top</span>
          <button
            type="button"
            className={styles.footer__arrowBtn}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <img
              src="img/icons/Up.svg"
              alt=""
              className={styles.footer__arrowIcon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

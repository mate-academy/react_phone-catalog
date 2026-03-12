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
        <div className={styles.footer__logoWrapper}>
          <Link to="/" className={styles.footer__logo}>
            <div className={styles.footer__logoContainer}>
              <img
                src="img/icons/logo.svg"
                alt="Nice Gadgets"
                className={styles.footer__logoText}
              />
              <img
                src="img/icons/logo-flame.png"
                alt=""
                className={styles.footer__logoFlame}
              />
            </div>
          </Link>
        </div>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__links}>
            <li>
              <a
                href="https://github.com/mate-academy/react_phone-catalog"
                className={styles.footer__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>

            <li>
              <a
                href="https://www.youtube.com/watch?v=STzK1XrpoBs"
                className={styles.footer__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacts
              </a>
            </li>

            <li>
              <a
                href="#"
                className={styles.footer__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__backToTop}>
          <button
            type="button"
            className={styles.footer__backToTopBtn}
            onClick={scrollToTop}
          >
            <span className={styles.footer__backToTopText}>Back to top</span>
            <span className={styles.footer__backToTopIcon}>
              <img src="img/icons/arrow-up.svg" alt="Back to top" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

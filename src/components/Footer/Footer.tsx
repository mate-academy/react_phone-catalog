import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logo}>
          <img
            src="images/icons/logo.png"
            alt="Nice Gadgets Logo"
            className={styles.footer__img}
          />
        </Link>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__link}
              >
                Github
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/vitamartsekhovska"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__link}
              >
                Contacts
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/vitamartsekhovska"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__link}
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__backToTop}>
          <span className={styles.footer__backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.footer__backToTopBtn}
            onClick={handleScrollToTop}
            aria-label="Back to top"
          >
            <img
              src="images/icons/arrow-up.png"
              alt="Arrow up"
              className={styles.footer__arrow}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

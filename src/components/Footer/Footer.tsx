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
      <div className={styles.footer__container}>
        <Link to="/" className={styles.footer__logo}>
          <img src="img/Logo.svg" alt="Logo" />
        </Link>

        <nav className={styles.footer__nav}>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className={`${styles.footer__link} uppercase`}
          >
            Github
          </a>
          <Link to="/contacts" className={`${styles.footer__link} uppercase`}>
            Contacts
          </Link>

          <Link to="/rights" className={`${styles.footer__link} uppercase`}>
            Rights
          </Link>
        </nav>

        <div className={styles.footer__top}>
          <button
            type="button"
            className={styles.footer__top_button}
            onClick={scrollToTop}
          >
            <span className={`${styles.footer__top_text} small-text12`}>
              Back to top
            </span>

            <img
              src="./img/TopBtn.svg"
              alt=""
              className={styles.footer__top_icon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

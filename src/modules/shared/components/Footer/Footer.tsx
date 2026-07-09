export type FooterProps = Record<string, never>;
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo.svg';
import styles from './Footer.module.scss';

const UP_CHEVRON_PATH = `M3.52876 10.4714C3.26841 10.211 3.26841 9.7889 3.52876 9.52855L7.52876 5.52856C7.78911 5.26821 8.21122 5.26821 8.47157 5.52856L12.4716 9.52856C12.7319 9.78891 12.7319 10.211 12.4716 10.4714C12.2112 10.7317 11.7891 10.7317 11.5288 10.4714L8.00016 6.94277L4.47157 10.4714C4.21122 10.7317 3.78911 10.7317 3.52876 10.4714Z`;

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="Logo" className={styles.footer__logo} />

      <div className={styles.footer__links}>
        <a
          href="https://github.com/RupertWisdomjm"
          className={styles.footer__link}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <Link to="/contacts" className={styles.footer__link}>
          Contacts
        </Link>
        <Link to="/rights" className={styles.footer__link}>
          Rights
        </Link>
      </div>
      <a href="#top" className={styles.footer__backToTop}>
        <span className={styles.footer__backToTopText}>Back to top</span>
        <span className={styles.footer__backToTopButton} aria-hidden="true">
          <svg
            className={styles.footer__backToTopButtonIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={UP_CHEVRON_PATH}
              fill="currentColor"
            />
          </svg>
        </span>
      </a>
    </footer>
  );
};

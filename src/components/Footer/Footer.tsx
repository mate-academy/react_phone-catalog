import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.footer}>
      <div className={styles['footer__logo-wrapper']}>
        <Link to="/">
          <img src="./img/logo.svg" alt="MA" className={styles.footer__logo} />
        </Link>
      </div>
      <nav className={styles.footer__nav}>
        <ul className={styles.footer__navList}>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/hannachachacha/react_phone-catalog"
              className={styles.footer__link}
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="#" className={styles.footer__link}>
              Contacts
            </a>
          </li>
          <li>
            <a href="#" className={styles.footer__link}>
              Rights
            </a>
          </li>
        </ul>
      </nav>

      <div
        className={styles.footer__backToTop}
        onClick={scrollToTop}
        onKeyDown={e => e.key === 'Enter' && scrollToTop()}
      >
        <span className={styles.footer__backToTopText}>Back to top</span>
        <button
          className={styles.footer__backToTopBtn}
          aria-label="Scroll to top"
        >
          <img src="./img/Icons/arrow-up.svg" />
        </button>
      </div>
    </div>
  );
};

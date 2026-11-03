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
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="./img/icons/logo.svg" alt="Nice Gadgets Logo" />
          </Link>
        </div>

        <nav className={styles.nav}>
          <a
            href="https://github.com/nkoropka/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>

          <a href="#contacts" className={styles.link}>
            Contacts
          </a>

          <a href="#rights" className={styles.link}>
            Rights
          </a>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.backToTopBtn}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <img src="./img/icons/arrow-top.svg" alt="Arrow top" />
          </button>
        </div>
      </div>
    </footer>
  );
};

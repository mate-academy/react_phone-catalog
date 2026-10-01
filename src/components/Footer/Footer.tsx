import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.content}`}>
        <Link to="/" className={styles.logo}>
          NICE<span className={styles.logoAccent}>⚡</span>GADGETS
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com/blabunch/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            GitHub
          </a>
          <a href="#" className={styles.navLink}>
            Contacts
          </a>
          <a href="#" className={styles.navLink}>
            Rights
          </a>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.backToTopButton}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <Icon name="chevronUp" />
          </button>
        </div>
      </div>
    </footer>
  );
};

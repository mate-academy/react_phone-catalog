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
        <Link to="/" className={styles.logo}>
          <img src="/img/Logo.svg" alt="Logo" className={styles.logoImage} />
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Github
          </Link>
          <Link to="/" className={styles.navLink}>
            Contacts
          </Link>
          <Link to="/" className={styles.navLink}>
            Rights
          </Link>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backText}>Back to top</span>
          <button
            className={styles.backButton}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          ></button>
        </div>
      </div>
    </footer>
  );
};

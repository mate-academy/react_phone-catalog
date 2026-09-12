import { Link } from 'react-router-dom';
import { ArrowUpIcon } from '../Icons/Icons';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToHome = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footer}>
        <Link to="/" className={styles.logo} onClick={goToHome}>
          <img
            src={`${import.meta.env.BASE_URL}img/Logo.png`}
            alt="Nice Gadgets logo"
            className={styles.logoImg}
          />
        </Link>

        <div className={styles.links}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a href="mailto:info@nicegadgets.com" className={styles.link}>
            Contacts
          </a>
          <a href="/" className={styles.link}>
            Rights
          </a>
        </div>

        <div className={styles.backToTop}>
          <span className={styles.backToTopLabel}>Back to top</span>
          <button
            type="button"
            className={styles.backToTopButton}
            aria-label="Back to top"
            onClick={scrollToTop}
          >
            <ArrowUpIcon size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

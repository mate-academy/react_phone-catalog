import { Icon } from '../Icon';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__inner}`}>
        <span className={styles.footer__logo}>
          NICE
          <span aria-hidden="true">👌</span>
          <br />
          GADGETS
        </span>

        <nav className={styles.footer__nav}>
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__link}
          >
            GitHub
          </a>

          <a href="#contacts" className={styles.footer__link}>
            Contacts
          </a>

          <a href="#rights" className={styles.footer__link}>
            Rights
          </a>
        </nav>

        <div className={styles.footer__backToTopWrap}>
          <span className={styles.footer__backToTopLabel}>Back to top</span>
          <button
            type="button"
            aria-label="Back to top"
            className={styles.footer__backToTop}
            onClick={scrollToTop}
          >
            <Icon name="arrow-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};

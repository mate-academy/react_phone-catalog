import { Logo } from '../Logo';
import { Icon } from '../Icon';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <nav className={styles.nav} aria-label="Footer">
          <a
            href="https://github.com/mate-academy/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a href="#/" className={styles.link}>
            Contacts
          </a>
          <a href="#/" className={styles.link}>
            Rights
          </a>
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
        >
          <span>Back to top</span>
          <span className={styles.arrow}>
            <Icon name="arrow-up" />
          </span>
        </button>
      </div>
    </footer>
  );
};

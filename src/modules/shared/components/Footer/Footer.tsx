import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import classNames from 'classnames';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={classNames('container', styles.containerFooter)}>
        <Link to="/" className={styles.logo} aria-label="Nice Gadgets"></Link>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a
                href="https://github.com/Roma-Yamshchikov"
                className={styles.navLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a
                href="https://ua.linkedin.com/"
                className={styles.navLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacts
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Roma-Yamshchikov"
                className={styles.navLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <button
          className={styles.backToTop}
          type="button"
          onClick={scrollToTop}
        >
          <span className={styles.backToTopText}>Back to top</span>
          <span className={styles.backToTopButton}>
            <span className={styles.backToTopIcon} aria-hidden="true" />
          </span>
        </button>
      </div>
    </footer>
  );
};

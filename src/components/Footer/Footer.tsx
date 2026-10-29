import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const GITHUB_URL = 'https://github.com/devsync25/react_phone-catalog';
const PROFILE_URL = 'https://github.com/devsync25';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="img/icons/logo.svg" alt="Nice Gadgets" height="28" />
        </Link>

        <nav className={styles.nav}>
          <a
            href={GITHUB_URL}
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>
          <a
            href={PROFILE_URL}
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            CONTACTS
          </a>
          <a
            href={GITHUB_URL}
            className={styles.link}
            target="_blank"
            rel="noreferrer"
          >
            RIGHTS
          </a>
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          Back to top
          <span className={styles.arrow}>
            <img
              src="img/icons/arrow-right.svg"
              alt=""
              width="16"
              height="16"
            />
          </span>
        </button>
      </div>
    </footer>
  );
};

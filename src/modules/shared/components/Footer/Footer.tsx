import styles from './Footer.module.scss';

const GITHUB_REPO_URL = 'https://github.com/ProKesha/react_phone-catalog';
const GITHUB_PROFILE_URL = 'https://github.com/ProKesha';
const LICENSE_URL =
  'https://github.com/ProKesha/react_phone-catalog/blob/HEAD/LICENSE';

const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <span className={styles.logo}>
        Nice <span className={styles.logoOk}>👌</span>
        <br />
        Gadgets
      </span>

      <nav className={styles.nav} aria-label="Footer navigation">
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Github
        </a>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Contacts
        </a>
        <a
          href={LICENSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Rights
        </a>
      </nav>

      <button
        type="button"
        className={styles.backToTop}
        onClick={handleScrollToTop}
        aria-label="Back to top"
      >
        <span className={styles.backToTopText}>Back to top</span>
        <span className={styles.backToTopIcon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4.75 9.25L8 6l3.25 3.25"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  </footer>
);

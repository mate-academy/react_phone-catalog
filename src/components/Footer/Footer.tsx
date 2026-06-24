import styles from './Footer.module.scss';
import { getPublicAssetPath } from '../../utils/category';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className={styles.logo}
        >
          <img
            src={getPublicAssetPath('/img/Logo.svg')}
            alt="Nice Gadgets"
            className={styles.logoImage}
          />
        </a>

        <nav className={styles.nav} aria-label="Footer navigation">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span>Contacts</span>
          <span>Rights</span>
        </nav>

        <div className={styles.backToTop}>
          <span className={styles.backText}>Back to top</span>

          <button
            type="button"
            className={styles.button}
            onClick={handleBackToTop}
            aria-label="Back to top"
          >
            ^
          </button>
        </div>
      </div>
    </footer>
  );
};

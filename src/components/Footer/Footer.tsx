import { Link } from 'react-router-dom';
import { getAssetUrl } from '../../utils/asset';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.brandLink}>
          <img
            src={getAssetUrl('img/Nice%20Gadgets.png')}
            alt="Nice Gadgets"
            className={styles.brandLogo}
          />
        </Link>

        <nav className={styles.links} aria-label="Footer navigation">
          <a
            href="https://github.com/maksymivivan2000-dotcom"
            target="_blank"
            rel="noreferrer"
            className={styles.footerLink}
          >
            GitHub
          </a>

          <a
            href="mailto:contact@nicegadgets.com"
            className={styles.footerLink}
          >
            Contacts
          </a>

          <Link to="/rights" className={styles.footerLink}>
            Rights
          </Link>
        </nav>

        <div className={styles.backToTop}>
          <button
            type="button"
            className={styles.footerLink}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back To Up
          </button>
          <button
            type="button"
            className={styles.top}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img
              src={getAssetUrl('img/Chevron%20(Arrow%20up).png')}
              alt="Back to top"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <img
              src="/react_phone-catalog/img/logo.png"
              alt="Phone Catalog Logo"
            />
          </Link>
        </div>

        <div className={styles.center}>
          <a
            href="https://github.com/DariaFesiun"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>

          <Link to="/contacts" className={styles.link}>
            Contacts
          </Link>

          <p className={styles.rights}>Rights</p>
        </div>

        <div className={styles.right}>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.backToTop}
          >
            Back to top
          </button>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.top}
          >
            <img
              src="/react_phone-catalog/img/icons/arrow-up.svg"
              alt="Back to top"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

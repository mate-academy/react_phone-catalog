import styles from './Footer.module.scss';
import { getPublicUrl } from '../../utils/getPublicUrl';

const repo = 'https://github.com/elenachernyshova01-cmd/react_phone-catalog';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <img
            className={styles.logo}
            src={getPublicUrl('/img/logo/logo.svg')}
            alt="Nice Gadgets"
          />
        </div>

        <nav className={styles.links}>
          <a
            className={styles.link}
            href={repo}
            target="_blank"
            rel="noreferrer"
          >
            GITHUB
          </a>

          <a
            className={styles.link}
            href="mailto:elena.chernyshova01@gmail.com"
          >
            CONTACTS
          </a>

          <a
            className={styles.link}
            href={`${repo}/blob/master/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
          >
            RIGHTS
          </a>
        </nav>

        <div className={styles.backToTop}>
          <button
            className={styles.backToTopButton}
            type="button"
            onClick={handleBackToTop}
          >
            <span className={styles.backToTopText}>Back to top</span>

            <span className={styles.arrowButton}>
              <img
                className={styles.arrow}
                src={getPublicUrl('/img/icon/product-chevron.svg')}
                alt=""
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

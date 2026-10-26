import { Link } from 'react-router-dom';
import { getPublicUrl } from '../../utils/getPublicUrl';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.logo}>
          <img
            src={getPublicUrl('img/icons/logo.svg')}
            alt="Nice Gadget Logo"
          />
        </Link>

        <div className={styles.links}>
          <a
            href="https://github.com/mate-academy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GITHUB
          </a>

          <a href="#contacts" className={styles.link}>
            CONTACTS
          </a>

          <a href="#rights" className={styles.link}>
            RIGHTS
          </a>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className={styles.backToTop}
        >
          <span>Back to top</span>

          <div className={styles.arrowIcon}>
            <img
              src={getPublicUrl('img/icons/arrow-up.svg')}
              alt="Back to top"
            />
          </div>
        </button>
      </div>
    </footer>
  );
};

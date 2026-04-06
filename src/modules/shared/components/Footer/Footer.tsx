import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link to="/" className={styles.logoLink}>
          <img
            src="/img/icon/nice-gadgets-desktop.svg"
            alt="Nice Gadgets"
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="https://github.com/" className={styles.menuLink}>
                Github
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Contacts
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.backToTopBlock}>
          <p className={styles.backToTopText}>Back to top</p>
          <button
            type="button"
            className={styles.backToTopButton}
            onClick={handleScrollToTop}
          >
            <img src="/img/icon/chevron-arrow-top.svg" alt="Arrow Top" />
          </button>
        </div>
      </div>
    </footer>
  );
};

import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { logoMap } from '../../config/logoMap';
import { useTheme } from '../../../../store/theme/ThemeContext';
import { arrowTopIconMap } from '../../config/arrowTopIconMap';
import { useScrollToTop } from '../../../../hooks/useScrollToTop';

export const Footer = () => {
  const { theme } = useTheme();
  const scrollToTop = useScrollToTop();

  const currentLogo = logoMap[theme];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link to="/" className={styles.logoLink} onClick={scrollToTop}>
          <img
            src={currentLogo.desktop}
            alt="Nice Gadgets"
            className={styles.logoImage}
          />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a
                href="https://github.com/horbenkoOleksandr"
                className={styles.menuLink}
                target="_blank"
                rel="noreferrer"
              >
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
            onClick={scrollToTop}
          >
            <img src={arrowTopIconMap[theme]} alt="Arrow Top" />
          </button>
        </div>
      </div>
    </footer>
  );
};

import styles from './Footer.module.scss';
import TopBarStyles from '../topbar/TopBar.module.scss';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__content}>
        <Link
          to="/"
          className={`${TopBarStyles.icon} ${TopBarStyles['icon--logo']} ${theme === 'light' && TopBarStyles['icon--logo-lightTheme']} ${TopBarStyles['icon--footerLogo']}`}
        ></Link>

        <nav className={styles.Footer__nav}>
          <ul className={styles.Footer__list}>
            <li className={styles.Footer__item}>
              <a
                href="https://github.com/viktoriamyhailiak"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.Footer__link} ${theme === 'light' && styles['Footer__link--lightTheme']}`}
              >
                {t('nav.github')}
              </a>
            </li>
            <li className={styles.Footer__item}>
              <Link
                to="/contacts"
                className={`${styles.Footer__link} ${theme === 'light' && styles['Footer__link--lightTheme']}`}
              >
                {t('nav.contacts')}
              </Link>
            </li>
            <li className={styles.Footer__item}>
              <Link
                to="/rights"
                className={`${styles.Footer__link} ${theme === 'light' && styles['Footer__link--lightTheme']}`}
              >
                {t('nav.rights')}
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.Footer__navToTop}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`${styles.Footer__toTopButton} ${theme === 'light' && styles['Footer__toTopButton--lightTheme']}`}
          >
            {t('nav.backToTop')}
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`${styles.Footer__upButton} ${theme === 'light' && styles['Footer__upButton--lightTheme']}`}
          ></button>
        </div>
      </div>
    </footer>
  );
};

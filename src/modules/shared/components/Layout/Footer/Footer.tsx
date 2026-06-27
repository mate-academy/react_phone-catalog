import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../../contexts/ThemeContext';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoDark = './img/icons/logo.svg';
  const logoLight = './img/icons/logo-light.svg';
  const { theme } = useTheme();

  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <a href="/">
            <img
              src={theme === 'dark' ? logoDark : logoLight}
              alt="Page Logo"
              className={styles.logo}
            />
          </a>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <a
                href="https://github.com/A1daros"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <a href="/" className={styles.link}>
                {t('footer.contacts')}
              </a>
            </li>
            <li>
              <a href="/" className={styles.link}>
                {t('footer.rights')}
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.backTop}>
          <span className={styles.buttonTopText}>{t('footer.backToTop')}</span>
          <button
            className={styles.backTopButton}
            onClick={scrollTop}
            aria-label="Back to top"
          >
            <div className={styles.iconWrapper}>
              <img
                src="./img/icons/back-up.svg"
                alt={t('footer.backToTopIconAlt')}
                aria-hidden="true"
                className={styles.icon}
              />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

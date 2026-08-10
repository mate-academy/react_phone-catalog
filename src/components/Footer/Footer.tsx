import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { getPublicPath } from '../../utils/getPublicPath';
import styles from './Footer.module.scss';

const repositoryUrl = 'https://github.com/m-berezovskyy/react_phone-catalog';
const contactsUrl = 'https://github.com/m-berezovskyy';
const rightsUrl = `${repositoryUrl}/blob/master/LICENSE`;

export const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const logoPath =
    theme === 'light' ? 'img/icon-logo-white-theme.svg' : 'img/logo.svg';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img
            src={getPublicPath(logoPath)}
            alt={t('header.logoAlt')}
            className={styles.logoImg}
          />
        </Link>

        <nav className={styles.links} aria-label={t('footer.navigation')}>
          <a
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            {t('footer.github')}
          </a>
          <a
            href={contactsUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            {t('footer.contacts')}
          </a>
          <a
            href={rightsUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            {t('footer.rights')}
          </a>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.backToTop}
            onClick={scrollToTop}
          >
            <span className={styles.backToTopText}>
              {t('footer.backToTop')}
            </span>
            <span className={styles.iconContainer}>
              <img
                src={getPublicPath('img/chevron-right.svg')}
                alt=""
                aria-hidden="true"
                className={styles.icon}
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo-dark.svg';
import logoWhite from '../../assets/icons/logo-white.svg';
import arrowTop from '../../assets/icons/arrow-top.svg';
import arrowTopWhite from '../../assets/icons/arrow-top-white.svg';
import styles from './Footer.module.scss';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img src={theme === 'dark' ? logoWhite : logo} alt="Nice Gadgets" />
        </NavLink>
        <nav>
          <ul className={styles.list}>
            <li>
              <a
                href="https://github.com/lishvets/react_phone-catalog"
                className={styles.link}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li>
              <NavLink to="/contacts" className={styles.link}>
                {t('contacts')}
              </NavLink>
            </li>
            <li>
              <NavLink to="/rights" className={styles.link}>
                {t('rights')}
              </NavLink>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className={styles.button}
          onClick={handleScrollToTop}
        >
          <span>{t('backToTop')}</span>
          <span className={styles.icon}>
            <img
              src={theme === 'dark' ? arrowTopWhite : arrowTop}
              alt={t('backToTop')}
            />
          </span>
        </button>
      </div>
    </footer>
  );
};

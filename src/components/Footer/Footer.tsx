import { Link } from 'react-router-dom';
import { useT } from '../../context/LanguageContext';
import logo from '../../assets/logo.svg';
import styles from './Footer.module.scss';

export const Footer = () => {
  const t = useT();
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Phone Catalog" />
        </Link>

        <ul className={styles.links}>
          <li>
            <a
              href="https://github.com/sonik-boom71/react_phone-catalog"
              target="_blank"
              rel="noreferrer"
            >
              {t('footer.github')}
            </a>
          </li>
          <li>
            <Link to="/contacts">{t('footer.contacts')}</Link>
          </li>
          <li>
            <Link to="/rights">{t('footer.rights')}</Link>
          </li>
        </ul>

        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollTop}
        >
          <span>{t('common.backToTop')}</span>
          <span className={styles.arrow} aria-hidden>
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <path
                d="M5 10l3-3 3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </footer>
  );
};

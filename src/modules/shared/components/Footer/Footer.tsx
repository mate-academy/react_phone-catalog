import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.scss';

const GITHUB_REPO_URL = 'https://github.com/flyman13/react_phone-catalog';
const CONTACTS_URL = 'https://github.com/flyman13';
const RIGHTS_URL =
  'https://github.com/flyman13/react_phone-catalog/blob/develop/LICENSE';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer} data-cy="appFooter">
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          NICE<span>GADGETS</span>
        </NavLink>

        <div className={styles.links}>
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('githubRepo')}
          </a>
          <a
            href={CONTACTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('contacts')}
          </a>
          <a
            href={RIGHTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t('rights')}
          </a>
        </div>

        <button
          type="button"
          onClick={handleScrollToTop}
          className={styles.backToTop}
        >
          <span>{t('backToTop')}</span>
          <span className={styles.iconButton}>
            <i className="fas fa-arrow-up" />
          </span>
        </button>
      </div>
    </footer>
  );
};

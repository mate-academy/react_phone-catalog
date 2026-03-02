import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
import buttonTopIcon from '@/assets/icons/Button-Top.svg';
import logoDark from '@/assets/icons/logo-dark.png';
import logoLight from '@/assets/icons/logo-light.png';

export const Footer = () => {
  const { t } = useTranslation();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [theme, setTheme] = useState(
    document.documentElement.getAttribute('data-theme'),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link
          to="/"
          className={styles.logoLink}
        >
          <img
            src={theme === 'light' ? logoLight : logoDark}
            alt="Voltrix"
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com/Team-Project-Phone-catalog/phone-catalog-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('footer.github')}
          </a>

          <Link to="/contacts">{t('footer.contacts')}</Link>
          <Link to="/rights">{t('footer.rights')}</Link>
        </nav>

        <div className={styles.back}>
          <span>{t('footer.back_to_top')}</span>

          <button
            onClick={handleScrollTop}
            className={styles.scrollTop}
          >
            <img
              src={buttonTopIcon}
              alt="Back to top"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

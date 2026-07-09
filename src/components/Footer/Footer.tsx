import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <Link to="/">
            <img src="/images/icons/Logo.svg" alt="Nice Gadgets Logo" />
          </Link>
        </div>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/pivkota/react_phone-catalog"
                className={styles.footer__link}
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.github')}
              </a>
            </li>
            <li className={styles.footer__item}>
              <Link to="/contacts" className={styles.footer__link}>
                {t('footer.contacts')}
              </Link>
            </li>
            <li className={styles.footer__item}>
              <Link to="/rights" className={styles.footer__link}>
                {t('footer.rights')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles['footer__back-to-top']}>
          <span className={styles['footer__back-text']}>
            {t('footer.back_to_top')}
          </span>
          <button
            type="button"
            className={styles['footer__back-button']}
            onClick={scrollToTop}
          >
            <div className={styles['footer__arrow-icon']} />
          </button>
        </div>
      </div>
    </footer>
  );
};

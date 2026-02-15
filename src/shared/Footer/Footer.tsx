import React from 'react';
import styles from './Footer.module.scss';
import { useTheme } from '../../context/PageTheme';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img
          className={styles.logo__img}
          src={
            theme === 'light'
              ? `${import.meta.env.BASE_URL}/img/icons/Logo.svg`
              : `${import.meta.env.BASE_URL}/img/dark_logo.svg`
          }
          alt="Logo"
        />
      </div>

      <div className={styles.footer__links}>
        <a
          href="https://github.com/nikalaiii/Nice-Gadgets"
          className={styles.footer__link}
        >
          git hub
        </a>
        <a
          href="https://en.wikipedia.org/wiki/Rights"
          className={styles.footer__link}
        >
          {t('ftr_right')}
        </a>
        <a
          href="mailto:mikalaj.krutak@gmail.com"
          className={styles.footer__link}
        >
          {t('ftr_contacts')}
        </a>
      </div>

      <div className={styles.toTop}>
        <p className={styles.toTop__title}>{t('ftr_toTop')}</p>
        <div
          className={styles.toTop__button}
          style={{
            backgroundImage:
              theme === 'light'
                ? `url('${import.meta.env.BASE_URL}/img/icons/toTop.svg')`
                : `url('${import.meta.env.BASE_URL}/img/icons/dark_topButton.svg')`,
          }}
        >
          <a href="#home" className={styles.toTop__link} />
        </div>
      </div>
    </footer>
  );
};

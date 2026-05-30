import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <NavLink to={'/'} className={styles.footer__logo}>
        <div className={styles.footer__logo__img} />
      </NavLink>
      <div className={styles.footer__contacts}>
        <a
          className={styles.footer__contacts__item}
          href="https://github.com/SaXoNG"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('github')}
        </a>
        <a
          className={styles.footer__contacts__item}
          href="https://www.instagram.com/vasyl_pryimakk"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('contacts')}
        </a>
        <a
          className={styles.footer__contacts__item}
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('rights')}
        </a>
      </div>
      <div className={styles.footer__back_to_top}>
        <p className={styles.footer__back_to_top__text}>{t('backToTop')}</p>
        <Button
          direction="up"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        />
      </div>
    </footer>
  );
};

import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/img/Logo.svg" alt="" />
        </div>
        <div className={styles.links}>
          <Link
            to="https://github.com/boggeniys/react_phone-catalog"
            className={styles.link}
          >
            GitHub
          </Link>
          <Link to="#" className={styles.link}>
            {t('Contacts')}
          </Link>
          <Link to="#" className={styles.link}>
            {t('Rights')}
          </Link>
        </div>
        <div className={styles.backToTop} onClick={scrollToTop}>
          <p className={styles.buttonText}>{t('BackToTop')}</p>
          <button className={styles.topButton}>
            <img src="/img/icons/arrow_right.svg" alt="" />
          </button>
        </div>
      </div>
    </footer>
  );
};

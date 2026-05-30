import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';
export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logo}>
        <img src="./img/Logo.svg" alt="Nice Gadgets" />
      </div>
      <nav className={styles.footer__nav}>
        <a href="https://github.com/yurzxw" className={styles.footer__link}>
          {t('footer.github')}
        </a>
        <a href="https://mate.academy/home" className={styles.footer__link}>
          {t('footer.contacts')}
        </a>
        <a href="https://react.dev" className={styles.footer__link}>
          {t('footer.rights')}
        </a>
      </nav>

      <div
        className={styles.footer__back}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className={styles.footer__top}>
          {t('footer.back_to_top')}
          <div className={styles.footer__arrowContainer}>
            <img
              src="./img/buttons/right-arrow.svg"
              alt="Back to top"
              style={{ transform: 'rotate(-90deg)' }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

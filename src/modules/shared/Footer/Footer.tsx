import { FC } from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { backToTop } from '../../../utils/backToTop';
import { useGlobalState } from '../../../context/store';
import { useTranslation } from 'react-i18next';

export const Footer: FC = () => {
  const { theme } = useGlobalState();
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <Link to="/" className={styles.logoLink}>
        <img
          src={
            theme === 'dark'
              ? './img/icons/logo.svg'
              : './img/icons/logo-light-theme.svg'
          }
          alt="logo"
          className={styles.logoImg}
        />
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to="https://github.com/VvynnykV"
              target="_blank"
              className={styles.navLink}
            >
              Github
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link to="/contacts" className={styles.navLink}>
              {t('footerNav.contacts')}
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link to="/rights" className={styles.navLink}>
              {t('footerNav.rights')}
            </Link>
          </li>
        </ul>
      </nav>

      <button className={styles.btn} onClick={backToTop}>
        <span className={styles.btnText}>{t('backBtn')}</span>

        <div className={styles.btnIcon}>
          <img
            src="/img/icons/arrow_up.svg"
            alt="button img"
            className={styles.btnImg}
          />
        </div>
      </button>
    </div>
  );
};

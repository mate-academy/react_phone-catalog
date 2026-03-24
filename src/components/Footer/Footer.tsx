import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.containetfotter}>
        <Link to="/" className={styles.logo}>
          <img src="./img/logo/Logo.svg" alt="Nice Gadgets" />
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.li_links}>
              <a
                // eslint-disable-next-line max-len
                href="https://github.com/mate-academy/react_phone-catalog/pull/941"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('git')}
              </a>
            </li>
            <li className={styles.li_links}>
              <a
                href="https://github.com/DebHtm"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('contact')}
              </a>
            </li>
            <li className={styles.li_links}>
              <a
                href="https://github.com/DebHtm"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('right')}
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.upscrole}>
          <p className={styles.textscrole}>{t('toup')}</p>
          <div className={styles.boxArrow}>
            <button
              className={styles.icon}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              <img src="./img/icons/arrowUp.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

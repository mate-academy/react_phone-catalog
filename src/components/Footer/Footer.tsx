import { Link, NavLink } from 'react-router-dom';
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
              <NavLink
                // eslint-disable-next-line max-len
                to="https://github.com/mate-academy/react_phone-catalog/pull/941"
                end
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {t('git')}
              </NavLink>
            </li>
            <li className={styles.li_links}>
              <NavLink
                to="https://github.com/DebHtm"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {t('contact')}
              </NavLink>
            </li>
            <li className={styles.li_links}>
              <NavLink
                to="https://github.com/DebHtm"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {t('right')}
              </NavLink>
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

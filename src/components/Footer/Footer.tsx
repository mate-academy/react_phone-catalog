import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../hooks/hooks';
import { Link } from 'react-router-dom';
import logoLight from '../../images/footer-logo-light-theme.svg';
import logoDark from '../../images/footer-logo-dark-theme.svg';
import arrowUpLight from '../../images/footer-arrowUp-light-theme.svg';
import arrowUpDark from '../../images/footer-arrowUp-dark-theme.svg';
import styles from './Footer.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Footer = () => {
  const { theme } = useAppSelector(state => state.theme);
  const { t } = useTranslation();

  const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const logo = theme === 'light' ? logoLight : logoDark;
  const arrow = theme === 'light' ? arrowUpLight : arrowUpDark;

  const handleLeavePageAlert = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const confirmLeave = window.confirm(t('footer.notificationAlert'));

    if (!confirmLeave) {
      e.preventDefault();
    }
  };

  const handleMockRights = () => {
    toast.info(t('footer.rightsAlert'));
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__container__content}>
          <div className={styles.footer__container__content__logo}>
            <Link
              to="/"
              className={styles.footer__container__content__logo__link}
            >
              <img
                className={styles.footer__container__content__logo__link__img}
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>

          <nav className={styles.footer__nav}>
            <ul className={styles.footer__nav__list}>
              <li className={styles.footer__nav__list__item}>
                <Link
                  to="https://github.com/anna-agerone"
                  className={styles.footer__nav__list__item__link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLeavePageAlert}
                >
                  GITHUB
                </Link>
              </li>
              <li className={styles.footer__nav__list__item}>
                <Link
                  className={styles.footer__nav__list__item__link}
                  to="https://github.com/anna-agerone"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLeavePageAlert}
                >
                  {t('footer.contacts')}
                </Link>
              </li>
              <li
                onClick={handleMockRights}
                className={styles.footer__nav__list__item}
              >
                {t('footer.rights')}
              </li>
            </ul>
          </nav>

          <div className={styles.footer__scrollToTop}>
            <p className={styles.footer__scrollToTop__text}>
              {t('footer.backToTop')}
            </p>
            <button
              className={styles.footer__scrollToTop__button}
              onClick={goToTop}
              aria-label="Scroll to top"
            >
              <img
                src={arrow}
                alt="Arrow Up"
                className={styles.footer__scrollToTop__button__icon}
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

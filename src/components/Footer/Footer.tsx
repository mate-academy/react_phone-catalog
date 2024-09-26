import React, { useContext } from 'react';
import logo from '../../assets/images/footer_images/Logo.png';
import darkLogo from '../../assets/icons/GadgetsLogoDarkTheme.svg';
import backToTopIcon from '../../assets/images/footer_images/Slider-button.png';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { RoutesPathes } from '../../utils/RoutesPathes';
import { FavoritesContext } from '../../context/FavoritesContext';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { theme } = useContext(FavoritesContext);
  const { t } = useTranslation();
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.bottomBar}>
          <a href="#" className={styles.bottomBar__link}>
            <img
              className={classNames(styles.bottomBar__logo, {
                [styles.dark]: theme === 'dark',
              })}
              src={theme === 'dark' ? darkLogo : logo}
              alt="NICE GADGETS logo"
            />
          </a>
        </div>

        <div className={styles.footer__links}>
          <a
            href="https://github.com/fs-jun24-team5/group_project_team5/tree/main"
            className={classNames(styles.footer__links__item, {
              [styles.dark]: theme === 'dark',
            })}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('github')}
          </a>

          <Link
            to={RoutesPathes.ABOUT}
            className={classNames(styles.footer__links__item, {
              [styles.dark]: theme === 'dark',
            })}
          >
            {t('aboutUs')}
          </Link>

          <a
            href="#"
            className={classNames(styles.footer__links__item, {
              [styles.dark]: theme === 'dark',
            })}
          >
            {t('rights')}
          </a>
        </div>

        <div className={styles.footer__backToTop}>
          <div className={styles.footer__backToTop__title}>{t('toTop')}</div>
          <div>
            <button onClick={handleBackToTop} className={styles.footer__backToTop__button}>
              <img
                src={backToTopIcon}
                alt="Back to top"
                className={styles.footer__backToTop__icon}
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

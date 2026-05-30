/* eslint-disable import/no-extraneous-dependencies, max-len */
import { NavLink } from 'react-router-dom';

import styles from './Footer.module.scss';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

function ScrollToTopButton() {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div onClick={scrollToTop} className={styles.footer__NavigationButton}>
      <p className={styles.footer__Link}>{t('footer.backToTop')}</p>
      <div className={styles.footer__LinkIconContainer}>
        <ChevronUp className={styles.footer__LinkIcon} />
      </div>
    </div>
  );
}

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.footer__Container}>
      <div className={styles.footer__Body}>
        <div className={styles.footer__Logo}>
          <NavLink to="/">
            <img src="img/new/LogoDarkTheme.svg" alt="" />
          </NavLink>
        </div>
        <div className={styles.footer__Navigation}>
          <a
            href="https://github.com/PaulKotsan/react_phone-catalog?tab=readme-ov-file"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__Link}
          >
            {t('footer.github')}
          </a>
          <a
            href="mailto:pavlokotsan421@gmail.com://gmail.com"
            className={styles.footer__Link}
          >
            {t('footer.contacts')}
          </a>
          <NavLink to="/rights" className={styles.footer__Link}>
            {t('footer.rights')}
          </NavLink>
        </div>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

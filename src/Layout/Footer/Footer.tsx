import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Footer.module.scss';

import { Logo } from '../../components/Logo';
import { goTo } from '../../utils/scrollToPosition';
import { ArrowButton } from '../../components/ArrowButton';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Logo />

      <nav className={styles.navigation}>
        <a
          href="https://github.com/Bukavyna"
          target="_blank"
          rel="noreferrer"
          className={styles.navigation__link}
        >
          Github
        </a>

        <a
          href="https://www.apple.com/contact/"
          target="_blank"
          rel="noreferrer"
          className={styles.navigation__link}
        >
          {t('footer.contacts')}
        </a>

        <a
          href="https://www.apple.com/legal/privacy/en-ww/"
          target="_blank"
          rel="noreferrer"
          className={styles.navigation__link}
        >
          {t('footer.rights')}
        </a>
      </nav>

      <div className={styles.scrollToTop}>
        {t('footer.backToTop')}
        <ArrowButton
          className={styles.scrollButtonToTop}
          arrowClassName={styles.arrowIcon}
          onClick={goTo}
        />
      </div>
    </footer>
  );
};

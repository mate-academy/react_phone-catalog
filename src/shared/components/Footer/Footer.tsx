import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ArrowUp from '@/assets/icons/arrow-up.svg?react';
import Logo from '@/assets/images/logo.svg?react';
import { CircleButton } from '@/shared/components/ui';
import { ROUTES } from '@/shared/constants';
import { scrollTopSmoothly } from '@/shared/utils';

import styles from './Footer.module.scss';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Link
        to={ROUTES.HOME}
        className={styles.logo}
        aria-label="Nice Gadgets — Home"
      >
        <Logo className={styles.logo__img} />
      </Link>

      <nav className={styles.nav}>
        <a
          href="https://github.com/AndreyKagaml/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a href="mailto:kagamlykas@gmail.com">Contacts</a>
        <a href="/">rights</a>
      </nav>

      <div className={styles.back}>
        <span className={styles.back__text}>{t('backToTop')}</span>
        <CircleButton
          className={styles.back__button}
          onClick={scrollTopSmoothly}
        >
          <ArrowUp />
        </CircleButton>
      </div>
    </footer>
  );
};

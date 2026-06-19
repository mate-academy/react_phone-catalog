import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoIcon from '@/assets/svg/logo.svg?react';
import styles from './HeaderLogo.module.scss';

export const HeaderLogo = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.logo}>
      <Link to="/">
        <LogoIcon
          className={`${styles.logoIcon}`}
          aria-label={t('header.logo.logoIcon')}
        />
      </Link>
    </div>
  );
};

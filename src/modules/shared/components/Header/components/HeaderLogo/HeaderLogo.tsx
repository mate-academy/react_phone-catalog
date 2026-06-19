import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logoIcon from '@/assets/svg/logo.svg';

import styles from './HeaderLogo.module.scss';

export const HeaderLogo = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.logo}>
      <Link to="/">
        <img
          src={logoIcon}
          className={styles.logoImg}
          alt={t('header.logo.logoIcon')}
        ></img>
      </Link>
    </div>
  );
};

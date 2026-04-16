import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './NavBarDesktop.module.scss';

import { NavIcons } from '../NavIcons';

interface NavBarDesktopProps {
  onClose: () => void;
}

export const NavBarDesktop: React.FC<NavBarDesktopProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__container}>
        <Link to="/" className={styles.navigation__link}>
          {t('nav.home')}
        </Link>
        <Link to="/phones" className={styles.navigation__link}>
          {t('nav.phones')}
        </Link>
        <Link to="/tablets" className={styles.navigation__link}>
          {t('nav.tablets')}
        </Link>
        <Link to="/accessories" className={styles.navigation__link}>
          {t('nav.accessories')}
        </Link>
      </div>

      <NavIcons styles={styles} onClose={onClose} />
    </nav>
  );
};

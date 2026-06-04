import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { NavIcons } from '../NavIcons';

import styles from './NavBarMobile.module.scss';

interface NavBarMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavBarMobile: React.FC<NavBarMobileProps> = ({
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <nav className={`${styles.navigation} ${isOpen ? styles.open : ''}`}>
      <Link onClick={onClose} to="/" className={styles.navigation__link}>
        {t('nav.home')}
      </Link>

      <Link onClick={onClose} to="/phones" className={styles.navigation__link}>
        {t('nav.phones')}
      </Link>
      <Link onClick={onClose} to="/tablets" className={styles.navigation__link}>
        {t('nav.tablets')}
      </Link>

      <Link
        onClick={onClose}
        to="/accessories"
        className={styles.navigation__link}
      >
        {t('nav.accessories')}
      </Link>

      <NavIcons styles={styles} onClose={onClose} />
    </nav>
  );
};

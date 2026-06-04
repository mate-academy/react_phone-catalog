import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Header.module.scss';

import { Logo } from '../../components/Logo';
import { NavBarMobile } from '../NavBarMobile';
import { NavBarDesktop } from '../NavBarDesktop/NavBarDesktop';
import { goBottom } from '../../utils/scrollToPosition';
import { ArrowButton } from '../../components/ArrowButton';
import { Settings } from '../Settings';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.header} id="header">
      <Logo />

      <NavBarDesktop isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Settings />

      <label
        htmlFor="burger"
        className={styles.header__burgerButton}
        aria-label={t('aria.toggleMenu')}
      >
        <input
          type="checkbox"
          id="burger"
          checked={isMenuOpen}
          onChange={() => setIsMenuOpen(prev => !prev)}
        />
        <span></span>
        <span></span>
        <span></span>
      </label>

      <ArrowButton
        className={styles.arrowButton}
        arrowClassName={styles.arrowIcon}
        onClick={goBottom}
      />

      <NavBarMobile isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

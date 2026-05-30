import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Navigation } from '../Navigation';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { FavoriteButton } from '../FavoriteButton';
import { CartButton } from '../CartButton';
import styles from './BurgerMenu.module.scss';

// Import icons
import burgerLight from './icons/burger-light.png';
import burgerDark from './icons/burger-dark.png';
import closeLight from './icons/close-light.png';
import closeDark from './icons/close-dark.png';
import logo from './icons/logo.png';
import logoDark from './icons/logo-dark.png';

export const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Get burger icon based on theme
  const burgerIcon = theme === 'dark' ? burgerDark : burgerLight;

  // Get close icon based on theme
  const closeIcon = theme === 'dark' ? closeDark : closeLight;

  // Get logo based on theme
  const logoIcon = theme === 'dark' ? logoDark : logo;

  return (
    <>
      {/* Burger Button - Only visible on mobile/tablet */}
      <button className={styles.burgerButton} onClick={handleToggle} aria-label="Toggle menu" aria-expanded={isOpen}>
        <img src={burgerIcon} alt="Menu" className={styles.burgerIcon} />
      </button>

      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={handleClose} aria-hidden="true" />}

      {/* Menu - Slides from top */}
      <aside className={`${styles.menu} ${isOpen ? styles.open : ''}`} aria-hidden={!isOpen}>
        {/* Top Section */}
        <div className={styles.top}>
          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={handleClose} aria-label="Go to home">
            <img src={logoIcon} alt="Nice Gadgets" className={styles.logoImage} />
          </Link>

          {/* Close Button */}
          <button className={styles.closeButton} onClick={handleClose} aria-label="Close menu">
            <img src={closeIcon} alt="Close" className={styles.closeIcon} />
          </button>
        </div>

        {/* Content Section */}
        <div className={styles.content}>
          {/* Navigation */}
          <Navigation variant="vertical" onLinkClick={handleClose} />

          {/* Switchers */}
          <div className={styles.switchers}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <FavoriteButton onLinkClick={handleClose} />
          <CartButton onLinkClick={handleClose} />
        </div>
      </aside>
    </>
  );
};

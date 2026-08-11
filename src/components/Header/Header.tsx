import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Navigation } from '../Navigation';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { FavoriteButton } from '../FavoriteButton';
import { CartButton } from '../CartButton';
import { BurgerMenu } from '../BurgerMenu';
import styles from './header.module.scss';

// Import logo images
import logo from './icons/logo.png';
import logoDark from './icons/logo-dark.png';
import dropdown from './icons/dropdown.png';
import dropdownDark from './icons/dropdown-dark.png';

export const Header: React.FC = () => {
  const { theme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get theme-based icons
  const logoIcon = theme === 'dark' ? logoDark : logo;
  const dropdownIcon = theme === 'dark' ? dropdownDark : dropdown;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isDropdownOpen]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Go to home">
          <img src={logoIcon} alt="Nice Gadgets" className={styles.logoImage} />
        </Link>

        {/* Navigation - Desktop & Tablet */}
        <nav className={styles.navigation}>
          <Navigation variant="horizontal" />
        </nav>

        {/* Actions Section */}
        <div className={styles.actions}>
          {/* Desktop Switchers - Visible only on desktop */}
          <div className={styles.desktopSwitchers}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>

          {/* Tablet Dropdown - Visible only on tablet */}
          <div className={styles.tabletDropdown} ref={dropdownRef}>
            <button className={`${styles.dropdownButton} ${isDropdownOpen ? styles.active : ''}`} onClick={handleDropdownToggle} aria-label="Settings" aria-expanded={isDropdownOpen}>
              <img src={dropdownIcon} alt="Settings" className={styles.dropdownIcon} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            )}
          </div>

          {/* Favorite & Cart Buttons - Desktop & Tablet */}
          <div className={styles.buttons}>
            <FavoriteButton />
            <CartButton />
          </div>

          {/* Burger Menu - Mobile Only */}
          <div className={styles.burgerWrapper}>
            <BurgerMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

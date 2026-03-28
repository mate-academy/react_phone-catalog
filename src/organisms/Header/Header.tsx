import Menu from '@/molecules/Menu';
import styles from './Header.module.scss';
import BagIcon from '@/assets/icons/shoping_bag.svg?react';
import HeartIcon from '@/assets/icons/heart.svg?react';
import Section from '@/atoms/Section';
import { cn } from '@/utils/cn';
import ThemeSwitch from '@/molecules/ThemeSwitch';
import Logo from '@/atoms/Logo';

import { Link } from 'react-router-dom';

type Props = {
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  isMenuOpen?: boolean;
  onMenuButtonClick?: () => void;
};

const Header = ({
  theme = 'dark',
  onThemeToggle,
  isMenuOpen = false,
  onMenuButtonClick,
}: Props) => {
  return (
    <Section as="header" unstyled className={styles.header}>
      <Section.Title as="h1" className={styles.visuallyHidden}>
        Phone catalog
      </Section.Title>

      <Logo variant="header" />
      <div className={styles.header__grid}>
        <Menu />
      </div>
      <nav className={styles.control} aria-label="User actions">
        <ThemeSwitch
          theme={theme}
          onToggle={onThemeToggle}
          className={cn(styles.control__button, styles.themeButton)}
        />
        <Link
          to="/liked"
          className={cn(styles.control__button, styles.response)}
        >
          <HeartIcon className={styles.control__icon} />
        </Link>
        <Link
          to="/shopping_bag"
          className={cn(styles.control__button, styles.response)}
        >
          <BagIcon className={styles.control__icon} />
        </Link>
        <button
          type="button"
          className={cn(styles.control__button, styles.menuButton)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={onMenuButtonClick}
        >
          <svg
            className={cn(styles.menuIcon, {
              [styles.menuIconOpen]: isMenuOpen,
            })}
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <line
              className={cn(styles.menuLine, styles.menuLineTop)}
              x1="4"
              y1="6"
              x2="20"
              y2="6"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <line
              className={cn(styles.menuLine, styles.menuLineMiddle)}
              x1="4"
              y1="12"
              x2="20"
              y2="12"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <line
              className={cn(styles.menuLine, styles.menuLineBottom)}
              x1="4"
              y1="18"
              x2="20"
              y2="18"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </nav>
    </Section>
  );
};

export default Header;

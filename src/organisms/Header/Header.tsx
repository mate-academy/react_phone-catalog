import { Menu, ThemeSwitch } from '@/molecules';
import s from './Header.module.scss';
import BagIcon from '@/assets/icons/shoping_bag.svg?react';
import HeartIcon from '@/assets/icons/heart.svg?react';
import { Section, Logo } from '@/atoms';
import { cn } from '@/utils/cn';

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
    <Section as="header" unstyled className={s.header}>
      <Section.Title as="h1" className={s.visuallyHidden}>
        Phone catalog
      </Section.Title>

      <Logo variant="header" />
      <div className={s.header__grid}>
        <Menu />
      </div>
      <nav className={s.control} aria-label="User actions">
        <ThemeSwitch
          theme={theme}
          onToggle={onThemeToggle}
          className={cn(s.control__button, s.themeButton)}
        />
        <Link
          to="/liked"
          className={cn(s.control__button, s.response)}
        >
          <HeartIcon className={s.control__icon} />
        </Link>
        <Link
          to="/shopping_bag"
          className={cn(s.control__button, s.response)}
        >
          <BagIcon className={s.control__icon} />
        </Link>
        <button
          type="button"
          className={cn(s.control__button, s.menuButton)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={onMenuButtonClick}
        >
          <svg
            className={cn(s.menuIcon, {
              [s.menuIconOpen]: isMenuOpen,
            })}
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <line
              className={cn(s.menuLine, s.menuLineTop)}
              x1="4"
              y1="6"
              x2="20"
              y2="6"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <line
              className={cn(s.menuLine, s.menuLineMiddle)}
              x1="4"
              y1="12"
              x2="20"
              y2="12"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <line
              className={cn(s.menuLine, s.menuLineBottom)}
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

import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Logo } from '../../shared/UI/Logo';
import { NavMain } from '../../shared/components/NavMain';
import { NavButtons } from '../../shared/components/NavButtons';
import { LanguageChange } from '../../shared/components/LanguageChange';
import { ThemeSwitcher } from '../../shared/components/ThemeSwitcher';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__left_side}>
        <Link to="/" className={styles.header__logo}>
          <Logo />
        </Link>

        <div className={styles.header__nav}>
          <NavMain />
        </div>
      </div>
      <LanguageChange />

      <ThemeSwitcher />

      <NavButtons />
    </header>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../modules/shared/i18n/i18n';
import { useTheme } from '../../modules/shared/context/ThemeContext';
import styles from './Header.module.scss';
import { Button } from '../UI/Button/Button';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Phone Catalog</Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/">{t('home')}</Link>
        <Link to="/category/phones">{t('category')}</Link>
        <Link to="/cart">{t('cart')}</Link>
        <Link to="/favorites">{t('favorites')}</Link>
      </nav>
      <div className={styles.actions}>
        <Button variant="secondary" size="sm" onClick={toggleTheme}>
          {theme === 'dark' ? '🌞' : '🌙'}
        </Button>
        <select
          value={i18n.language}
          onChange={e => i18n.changeLanguage(e.target.value)}
          className={styles.lang}
        >
          <option value="en">EN</option>
          <option value="ua">UA</option>
        </select>
      </div>
      <div className={styles.burger}></div>
    </header>
  );
};

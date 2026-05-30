import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const lng = event.target.value;

    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className={styles['language-switcher']}>
      <select
        className={styles['language-switcher__select']}
        value={i18n.language}
        onChange={handleLanguageChange}
        aria-label={t('common.selectLanguage')}
      >
        <option value="en">EN</option>
        <option value="uk">UA</option>
      </select>
    </div>
  );
};

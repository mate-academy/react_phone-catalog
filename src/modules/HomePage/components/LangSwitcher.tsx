/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './LangSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const handleLanguageChange = () => {
    const nextLanguage = currentLanguage === 'en' ? 'ua' : 'en';

    i18n.changeLanguage(nextLanguage);
  };

  return (
    <button onClick={handleLanguageChange} className={style.langSwitcher}>
      {currentLanguage === 'en' ? 'UA' : 'EN'}
    </button>
  );
};

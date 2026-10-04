import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const actualLanguage = i18n.language;

  const toggleLanguage = () => {
    const nextLanguage = actualLanguage === 'en' ? 'es' : 'en';

    i18n.changeLanguage(nextLanguage);
    localStorage.setItem('language', nextLanguage);
  };

  return (
    <button
      className={styles.language}
      onClick={toggleLanguage}
      title={actualLanguage === 'en' ? 'english' : 'español'}
    >
      {actualLanguage.toUpperCase()}
    </button>
  );
};

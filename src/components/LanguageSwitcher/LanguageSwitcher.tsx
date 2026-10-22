import { useLanguage } from '../../shared/context/LanguageContext';

import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = () => {
    setLanguage(language === 'en' ? 'uk' : 'en');
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleLanguageChange}
      aria-label={
        language === 'en'
          ? 'Switch language to Ukrainian'
          : 'Switch language to English'
      }
    >
      <span className={language === 'en' ? styles.active : ''}>EN</span>

      <span className={styles.separator}>/</span>

      <span className={language === 'uk' ? styles.active : ''}>UA</span>
    </button>
  );
};

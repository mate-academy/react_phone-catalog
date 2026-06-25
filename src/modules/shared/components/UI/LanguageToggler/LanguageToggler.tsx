import styles from './LanguageToggler.module.scss';
import { useTranslation } from 'react-i18next';

export const LanguageToggler = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.resolvedLanguage || 'ua';

  const handleNnextLanguage = () => {
    const nextLanguage = currentLanguage === 'ua' ? 'en' : 'ua';

    i18n.changeLanguage(nextLanguage);
  };

  return (
    <div className={styles.togglerWrapper}>
      <button
        className={styles.toggler}
        aria-label="Toggle language"
        onClick={handleNnextLanguage}
      >
        {currentLanguage.toUpperCase()}
      </button>
    </div>
  );
};

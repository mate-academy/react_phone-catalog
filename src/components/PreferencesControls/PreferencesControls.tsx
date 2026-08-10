import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './PreferencesControls.module.scss';

interface PreferencesControlsProps {
  showLanguage?: boolean;
}

export const PreferencesControls = ({
  showLanguage = true,
}: PreferencesControlsProps) => {
  const { language, t, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const themeLabel =
    theme === 'dark' ? t('header.lightTheme') : t('header.darkTheme');

  return (
    <div className={styles.controls} aria-label={t('header.preferences')}>
      <button
        type="button"
        className={styles.button}
        aria-label={themeLabel}
        title={themeLabel}
        onClick={toggleTheme}
      >
        <span
          className={`${styles.themeIcon} ${
            theme === 'dark' ? styles.sunIcon : styles.moonIcon
          }`}
          aria-hidden="true"
        />
      </button>

      {showLanguage && (
        <button
          type="button"
          className={`${styles.button} ${styles.language}`}
          aria-label={t('header.language')}
          title={t('header.language')}
          onClick={toggleLanguage}
        >
          {language === 'en' ? 'EN' : 'УКР'}
        </button>
      )}
    </div>
  );
};

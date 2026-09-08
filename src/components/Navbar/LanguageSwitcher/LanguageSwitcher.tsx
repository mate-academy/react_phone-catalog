import styles from '../Navbar.module.scss';
import { useAppDispatch, useAppState } from '../../../contexts/AppContext';

export const LanguageSwitcher = () => {
  const { language } = useAppState();
  const { setLanguage } = useAppDispatch();

  return (
    <div className={styles.settingsMenuItem}>
      <span className={`${styles.settingsType} bodyText`}>
        {language.toUpperCase()}
      </span>
      <button
        onClick={() => setLanguage(language === 'uk' ? 'en' : 'uk')}
        className={styles.switcher}
      >
        <div
          className={`
          ${styles.switcherThumb}
          ${language === 'uk' ? styles.switcherThumbOn : ''}
        `}
        ></div>
      </button>
    </div>
  );
};

import classNames from 'classnames';
import styles from './Switchers.module.scss';
import { useTheme } from '../../../../utils/useTheme';
import { useTranslation } from 'react-i18next';
const Switchers = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation(); // Хук для роботи з i18n

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang); // Змінюємо мову
  };

  return (
    <div className={styles.switchers}>
      <div className={styles.languageSwitcher}>
        <p className={styles.text}>{t('lang')}</p>
        <button
          className={classNames(styles.btn, {
            [styles.active]: i18n.language === 'en',
          })}
          onClick={() => changeLanguage('en')}
        >
          English
        </button>
        <button
          className={classNames(styles.btn, {
            [styles.active]: i18n.language === 'uk',
          })}
          onClick={() => changeLanguage('uk')}
        >
          Українська
        </button>
      </div>
      <div className={styles.theme}>
        <p className={styles.text}>{t('theme')}</p>
        <div className={styles.themeSwitcher} onClick={() => toggleTheme()}>
          <button
            className={classNames(styles.switcher, {
              [styles.switcherActive]: theme === 'dark',
            })}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Switchers;

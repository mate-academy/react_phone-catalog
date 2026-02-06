import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context';
import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const isLightTheme = theme === 'light';
  const iconSrc = isLightTheme ? '/img/dark_theme.svg' : '/img/light_theme.svg';
  const label = isLightTheme
    ? t('header.switchToDarkTheme')
    : t('header.switchToLightTheme');

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleTheme}
      title={label}
    >
      <img
        className={styles.icon}
        src={iconSrc}
        alt={label}
        data-no-dark-filter="true"
      />
    </button>
  );
};

//#region imports
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../modules/shared/hooks/useTheme';
import styles from './ThemeSwitcher.module.scss';
//#endregion

export const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation('header');

  return (
    <button
      className={cn(styles.switch, {
        [styles.darkTheme]: isDark,
      })}
      onClick={toggleTheme}
      aria-label={isDark ? t('switchToLight') : t('switchToDark')}
      aria-pressed={isDark}
    >
      <div className={styles.slider} aria-hidden="true"></div>
    </button>
  );
};

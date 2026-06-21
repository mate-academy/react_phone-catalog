/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/modules/shared/utils/context/ThemeContext';

import styles from './ThemeToggler.module.scss';
//#endregion

interface Props {
  className?: string;
}

export const ThemeToggler: React.FC<Props> = ({ className = '' }) => {
  //#region HOOKS
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  //#endregion

  //#region RENDER
  return (
    <button
      className={`${styles.themeToggler} ${className}`}
      onClick={toggleTheme}
      type="button"
      aria-label={t('header.actions.aria.theme')}
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </button>
  );
  //#endregion
};

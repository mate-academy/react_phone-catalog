import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@hooks/useTheme';

import styles from './ThemeToggle.module.scss';

type TProps = {
  id: string;
};

export const ThemeToggle: FC<TProps> = ({ id }) => {
  const { isNotLightTheme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const localTheme = t('toggleTheme');

  return (
    <div className={styles.toggle}>
      <label htmlFor={id} className={styles.container}>
        <input
          id={id}
          type="checkbox"
          aria-checked={isNotLightTheme}
          aria-label={localTheme}
          onChange={toggleTheme}
          checked={isNotLightTheme}
        />
        <div className={styles.switch}>
          <div></div>
          <div></div>
          <span></span>
        </div>
      </label>
    </div>
  );
};

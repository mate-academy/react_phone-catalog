import React from 'react';
import { useTranslation } from 'react-i18next';

import rawStyles from './ThemeSelector.module.scss';
const styles = rawStyles as { [key: string]: string };

import { ThemeConfig } from './themeConfig';

interface ThemeCardProps {
  theme: ThemeConfig;
  isActive: boolean;
  onClick: () => void;
}

export const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  isActive,
  onClick,
}) => {
  const { t } = useTranslation();
  const inputId = `theme-${theme.id}`;

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor={inputId}
      className={`${styles.optionCard} ${isActive ? styles.active : ''}`}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <div className={styles.cardContent}>
        <span className={styles.cardLabel}>{t(`colors.${theme.nameKey}`)}</span>

        <div
          className={styles.cardBadge}
          style={{ backgroundColor: theme.backgroundColor }}
        />
      </div>

      <span className={styles.radioCustom}>
        <input
          id={inputId}
          type="radio"
          name="theme"
          value={String(theme.id)}
          checked={isActive}
          onChange={onClick}
          className={styles.radio}
        />
      </span>
    </label>
  );
};

import React from 'react';
import { useTranslation } from 'react-i18next';

import rawStyles from './LanguageSelector.module.scss';
const styles = rawStyles as { [key: string]: string };

import { LanguageConfig } from './languageConfig';

export interface LanguageCardProps {
  language: LanguageConfig;
  isActive: boolean;
  onClick: () => void;
}

export const LanguageCard: React.FC<LanguageCardProps> = ({
  language,
  isActive,
  onClick,
}) => {
  const { t } = useTranslation();
  const inputId = `language-${language.id}`;

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      htmlFor={inputId}
      className={`${styles.optionCard} ${isActive ? styles.active : ''}`}
    >
      <div className={styles.cardContent}>
        <span className={styles.cardLabel}>
          {t(`languages.${language.nameKey}`)}
        </span>

        <div className={styles.cardBadge}>{language.label}</div>

        <span className={styles.radioCustom}>
          <input
            id={inputId}
            type="radio"
            name="language"
            value={language.id}
            checked={isActive}
            onChange={onClick}
            className={styles.radio}
          />
        </span>
      </div>
    </label>
  );
};

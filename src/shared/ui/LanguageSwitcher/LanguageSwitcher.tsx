import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LanguageSwitcher.module.scss';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        className={classNames(styles.button, {
          [styles.active]: i18n.resolvedLanguage === 'en',
        })}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => i18n.changeLanguage('uk')}
        className={classNames(styles.button, {
          [styles.active]: i18n.resolvedLanguage === 'uk',
        })}
      >
        UA
      </button>
    </div>
  );
};

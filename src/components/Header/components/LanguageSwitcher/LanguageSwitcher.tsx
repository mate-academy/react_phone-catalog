import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import styles from './LanguageSwitcher.module.scss';

interface Props {
  onClose?: () => void;
}

export const LanguageSwitcher: React.FC<Props> = ({ onClose}) => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language.split('-')[0];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.switcher}>
      <button
        type="button"
        className={cn(styles.button, {
          [styles['button--active']]: currentLang === 'en',
        })}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <span className={styles.separator}>|</span>
      <button
        type="button"
        className={cn(styles.button, {
          [styles['button--active']]: currentLang === 'pl',
        })}
        onClick={() => changeLanguage('pl')}
      >
        PL
      </button>
    </div>
  );
};

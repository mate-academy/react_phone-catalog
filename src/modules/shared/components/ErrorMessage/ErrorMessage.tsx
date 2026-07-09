import React from 'react';
import styles from './ErrorMessage.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  const { t } = useTranslation();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>{t('error.title')}</h2>
      <p className={styles.error__text}>{message}</p>
      <button
        type="button"
        className={styles.error__button}
        onClick={handleReload}
      >
        {t('error.reload')}
      </button>
    </div>
  );
};

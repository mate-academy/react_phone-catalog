import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import styles from './BackButton.module.scss';
import { useTranslation } from 'react-i18next';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleBack} className={styles.backButton}>
      <ArrowLeft className={styles.backButton__icon} />
      <span className={styles.backButton__text}>{t('buttons.back')}</span>
    </button>
  );
};

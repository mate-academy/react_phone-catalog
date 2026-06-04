import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './BackButton.module.scss';

import { ArrowIcon } from '../ArrowIcon';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" className={styles.backButton} onClick={handleGoBack}>
      <div className={styles.iconWrapper}>
        <ArrowIcon className={styles.arrowIcon} />
      </div>
      <span className={styles.text}>{t('buttonBack')}</span>
    </button>
  );
};

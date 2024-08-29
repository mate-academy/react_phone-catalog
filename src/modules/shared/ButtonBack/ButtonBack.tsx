import React, { useEffect, useState } from 'react';
import styles from './ButtonBack.module.scss';
import { useAppSelector } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';

export const ButtonBack: React.FC = () => {
  const { t } = useTranslation();

  const [isBackDisabled, setIsBackDisabled] = useState(false);

  const isDark = useAppSelector(state => state.boolean.isDark);

  useEffect(() => {
    if (window.history.length < 1) {
      setIsBackDisabled(true);
    }
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      return;
    }
  };

  return (
    <div
      onClick={handleGoBack}
      className={`${styles.buttonBack} ${isBackDisabled && styles.buttonDisabled}`}
    >
      <img src="./icons/arrow-left-ico.svg" alt="arrow-back" />
      <p className={`${styles.buttonBackText} ${isDark && styles.backDark}`}>
        {t('back')}
      </p>
    </div>
  );
};

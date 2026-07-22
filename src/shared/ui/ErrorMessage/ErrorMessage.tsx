import React from 'react';
import styles from './ErrorMessage.module.scss';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';

type Props = {
  onReload: () => void;
};

export const ErrorMessage: React.FC<Props> = ({ onReload }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.error}>
      <Typography variant="h3">{t('errorMessage.message')}</Typography>

      <Button onClick={onReload} className={styles.errorButton}>
        {t('buttons.reload')}
      </Button>
    </div>
  );
};

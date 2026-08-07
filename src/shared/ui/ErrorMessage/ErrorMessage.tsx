import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ErrorMessage.module.scss';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { useAppDispatch } from '@src/app/hooks';
import { fetchProducts } from '@src/features/products';

export const ErrorMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className={styles.error}>
      <Typography variant="h3">{t('errorMessage.message')}</Typography>

      <Button
        onClick={() => dispatch(fetchProducts())}
        className={styles.errorButton}
      >
        {t('buttons.reload')}
      </Button>
    </div>
  );
};

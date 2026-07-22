import { Container } from '@shared/components/Container';
import { Typography } from '@shared/ui/Typography';
import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="h1" className={styles.title}>
        {t('pageNotFound.message')}
      </Typography>
    </Container>
  );
};

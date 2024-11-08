import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@ui/index';

import styles from './NoResults.module.scss';

export const NoResults: FC = () => {
  const { t } = useTranslation();
  const localTitle = t('search.title');
  const localText = t('search.text');

  return (
    <div className={styles.noMatch}>
      <Title level={3}>{localTitle}</Title>
      <p>{localText}</p>
    </div>
  );
};

import React from 'react';
import styles from './Categories.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  h1: string;
  models: number;
};
const CategoriesTop: React.FC<Props> = ({ h1, models }) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className={styles.title}>{h1}</h1>
      <p className={styles.subtitle}>
        {models} {t('models')}
      </p>
    </>
  );
};

export default CategoriesTop;

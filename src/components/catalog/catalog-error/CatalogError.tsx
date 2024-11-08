import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Title } from '@ui/index';

import styles from './CatalogError.module.scss';

export const CatalogError: FC = () => {
  const { t } = useTranslation();
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <section className={styles.error} role="alert">
      <Title level={2}>{t('error.title')}</Title>
      <button
        type="button"
        onClick={handleReload}
        className={styles.reloadButton}
        aria-label={t('error.label')}
      >
        {t('error.text')}
      </button>
    </section>
  );
};
